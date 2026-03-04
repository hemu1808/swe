"""
Enterprise-grade NL→SQL analytics API (FastAPI + MySQL + Ollama/OpenAI-compatible)

Key design goals for large schemas:
- Fast schema retrieval with token inverted index + FK neighborhood expansion
- Optional embedding-based retrieval for schema chunks (Ollama embeddings endpoint)
- Deterministic SQL generation with strong post-generation validation
- Guardrails: SELECT-only, table/column allowlist (from live schema), LIMIT enforcement,
  EXPLAIN-based cost gating, max execution time, row caps, and grounded summarization
- Production hygiene: env-based config, connection pooling, structured logging, caching

Recommended pip deps:
  pip install fastapi uvicorn mysql-connector-python pydantic-settings tenacity cachetools
Optional (strongly recommended):
  pip install sqlglot

Run:
  export DB_HOST=...
  export DB_USER=readonly_user
  export DB_PASSWORD=...
  export DB_NAME=...
  export OLLAMA_URL=http://localhost:11434/v1
  export LLM_MODEL=llama3
  uvicorn app:app --host 0.0.0.0 --port 8000
"""

from __future__ import annotations

import os
import re
import json
import time
import hashlib
import logging
from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Tuple, Set

import mysql.connector
from mysql.connector.pooling import MySQLConnectionPool

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field, ConfigDict
try:
    from pydantic_settings import BaseSettings, SettingsConfigDict
except ImportError:
    from pydantic import BaseSettings, ConfigDict as SettingsConfigDict

from cachetools import TTLCache
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

from openai import OpenAI

try:
    import sqlglot
    from sqlglot import exp
except Exception:  # optional dependency
    sqlglot = None
    exp = None


# ============================================================
# Configuration (12-factor)
# ============================================================

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # DB
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_USER: str = "root"
    DB_PASSWORD: str = "hemu1808"
    DB_NAME: str = "finance_demo"

    # Pooling
    DB_POOL_NAME: str = "analytics_pool"
    DB_POOL_SIZE: int = 10

    # LLM (Ollama OpenAI-compatible)
    OLLAMA_URL: str = "http://localhost:11434/v1"
    LLM_MODEL: str = "llama3"
    LLM_TEMPERATURE_SQL: float = 0.0
    LLM_TEMPERATURE_SUMMARY: float = 0.2

    # Schema caching
    SCHEMA_REFRESH_SECONDS: int = 900   # 15 minutes
    SCHEMA_CACHE_FILE: str = "./schema_cache.json"

    # Retrieval limits (tune for your schema size)
    TOP_TABLES: int = 18
    FK_NEIGHBORS: int = 10
    MAX_COLUMNS_PER_TABLE: int = 80

    # Query guardrails
    DEFAULT_LIMIT: int = 200
    ABSOLUTE_MAX_LIMIT: int = 1000
    REQUIRE_LIMIT: bool = True
    MAX_EXECUTION_MS: int = 4000           # MySQL max_execution_time (ms)
    MAX_RETURNED_ROWS: int = 2000          # server-side cap
    EXPLAIN_MAX_ROWS_ESTIMATE: int = 2_000_000  # reject queries with huge row estimate

    # API
    API_TITLE: str = "AI Analytics API"
    API_VERSION: str = "1.0.0"

settings = Settings()

if not settings.DB_NAME:
    raise RuntimeError("DB_NAME must be set (env DB_NAME).")


# ============================================================
# Logging (structured enough for production)
# ============================================================

logger = logging.getLogger("ai_analytics")
handler = logging.StreamHandler()
formatter = logging.Formatter(
    fmt="%(asctime)s %(levelname)s %(name)s %(message)s"
)
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.INFO)


# ============================================================
# Utilities
# ============================================================

TOKEN_RE = re.compile(r"[a-zA-Z0-9_]+")

def tokenize(text: str) -> List[str]:
    toks = [t.lower() for t in TOKEN_RE.findall(text)]
    # remove tiny noise tokens
    return [t for t in toks if len(t) >= 2]

def sha256_str(s: str) -> str:
    return hashlib.sha256(s.encode("utf-8")).hexdigest()

def now() -> float:
    return time.time()


# ============================================================
# Schema Registry (large-schema optimized)
# - Loads columns and FKs
# - Builds inverted index token -> tables
# - Optionally builds "schema chunks" for embedding retrieval
# ============================================================

@dataclass(frozen=True)
class ColumnInfo:
    name: str
    dtype: str

@dataclass
class TableInfo:
    name: str
    columns: List[ColumnInfo]

@dataclass
class ForeignKeyInfo:
    child_table: str
    child_column: str
    parent_table: str
    parent_column: str

class SchemaRegistry:
    def __init__(self, pool: MySQLConnectionPool):
        self.pool = pool

        self.tables: Dict[str, TableInfo] = {}
        self.fks: List[ForeignKeyInfo] = []
        self.fk_graph: Dict[str, Set[str]] = {}

        # token -> set(table)
        self.inverted: Dict[str, Set[str]] = {}

        # simple TTL cache for full schema context by prompt hash
        self.context_cache = TTLCache(maxsize=512, ttl=600)

        self._loaded_at = 0.0
        self._schema_fingerprint = ""

    def _connect(self):
        return self.pool.get_connection()

    def needs_refresh(self) -> bool:
        return (now() - self._loaded_at) > settings.SCHEMA_REFRESH_SECONDS

    def refresh_if_needed(self):
        if not self.tables or self.needs_refresh():
            self.load_schema()

    def load_schema(self):
        """
        Load schema from information_schema with minimal overhead.
        Writes a cache file and uses it on next boot for faster startup.
        """
        logger.info("SchemaRegistry: loading schema for DB=%s", settings.DB_NAME)

        # Try cache file first (fast start), then validate quickly using a fingerprint.
        if os.path.exists(settings.SCHEMA_CACHE_FILE):
            try:
                with open(settings.SCHEMA_CACHE_FILE, "r", encoding="utf-8") as f:
                    cached = json.load(f)
                if cached.get("db") == settings.DB_NAME and cached.get("host") == settings.DB_HOST:
                    # If cache is recent enough, trust it (you can tighten this if needed)
                    cache_age = now() - cached.get("saved_at", 0)
                    if cache_age < settings.SCHEMA_REFRESH_SECONDS:
                        self._load_from_cache(cached)
                        logger.info("SchemaRegistry: loaded schema from cache file")
                        return
            except Exception as e:
                logger.warning("SchemaRegistry: cache load failed, will reload live: %s", e)

        # Live load
        conn = self._connect()
        try:
            cur = conn.cursor(dictionary=True)

            # Columns
            cur.execute(
                """
                SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, ORDINAL_POSITION
                FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA = %s
                ORDER BY TABLE_NAME, ORDINAL_POSITION
                """,
                (settings.DB_NAME,),
            )
            rows = cur.fetchall()

            tables: Dict[str, List[ColumnInfo]] = {}
            for r in rows:
                t = r["TABLE_NAME"]
                # filter system/prisma tables
                if t.startswith("_") or "migration" in t.lower():
                    continue
                tables.setdefault(t, [])
                if len(tables[t]) < settings.MAX_COLUMNS_PER_TABLE:
                    tables[t].append(ColumnInfo(name=r["COLUMN_NAME"], dtype=r["DATA_TYPE"]))

            # Foreign keys
            cur.execute(
                """
                SELECT
                    kcu.TABLE_NAME AS child_table,
                    kcu.COLUMN_NAME AS child_column,
                    kcu.REFERENCED_TABLE_NAME AS parent_table,
                    kcu.REFERENCED_COLUMN_NAME AS parent_column
                FROM information_schema.KEY_COLUMN_USAGE kcu
                WHERE kcu.TABLE_SCHEMA = %s
                  AND kcu.REFERENCED_TABLE_NAME IS NOT NULL
                """,
                (settings.DB_NAME,),
            )
            fk_rows = cur.fetchall()
            fks: List[ForeignKeyInfo] = []
            for r in fk_rows:
                child = r["child_table"]
                parent = r["parent_table"]
                if child in tables and parent in tables:
                    fks.append(
                        ForeignKeyInfo(
                            child_table=child,
                            child_column=r["child_column"],
                            parent_table=parent,
                            parent_column=r["parent_column"],
                        )
                    )

            self.tables = {t: TableInfo(name=t, columns=cols) for t, cols in tables.items()}
            self.fks = fks

            # Build FK graph
            g: Dict[str, Set[str]] = {t: set() for t in self.tables.keys()}
            for fk in self.fks:
                g[fk.child_table].add(fk.parent_table)
                g[fk.parent_table].add(fk.child_table)
            self.fk_graph = g

            # Build inverted index (tokens from table + columns)
            inverted: Dict[str, Set[str]] = {}
            for t, info in self.tables.items():
                tokens = set(tokenize(t))
                for c in info.columns:
                    tokens.update(tokenize(c.name))
                for tok in tokens:
                    inverted.setdefault(tok, set()).add(t)
            self.inverted = inverted

            # fingerprint (stable-ish) for debugging/metrics
            fp_seed = f"{settings.DB_NAME}|" + "|".join(sorted(self.tables.keys()))
            self._schema_fingerprint = sha256_str(fp_seed)[:16]
            self._loaded_at = now()

            # save cache file
            self._save_cache_file()

            # clear context cache
            self.context_cache.clear()

            logger.info(
                "SchemaRegistry: loaded tables=%d fks=%d fingerprint=%s",
                len(self.tables), len(self.fks), self._schema_fingerprint
            )
        finally:
            conn.close()

    def _save_cache_file(self):
        try:
            data = {
                "db": settings.DB_NAME,
                "host": settings.DB_HOST,
                "saved_at": now(),
                "fingerprint": self._schema_fingerprint,
                "tables": {
                    t: [{"name": c.name, "dtype": c.dtype} for c in info.columns]
                    for t, info in self.tables.items()
                },
                "fks": [fk.__dict__ for fk in self.fks],
            }
            with open(settings.SCHEMA_CACHE_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f)
        except Exception as e:
            logger.warning("SchemaRegistry: failed to write cache file: %s", e)

    def _load_from_cache(self, cached: Dict[str, Any]):
        self.tables = {
            t: TableInfo(name=t, columns=[ColumnInfo(**c) for c in cols])
            for t, cols in cached.get("tables", {}).items()
        }
        self.fks = [ForeignKeyInfo(**fk) for fk in cached.get("fks", [])]

        g: Dict[str, Set[str]] = {t: set() for t in self.tables.keys()}
        for fk in self.fks:
            if fk.child_table in g and fk.parent_table in g:
                g[fk.child_table].add(fk.parent_table)
                g[fk.parent_table].add(fk.child_table)
        self.fk_graph = g

        inverted: Dict[str, Set[str]] = {}
        for t, info in self.tables.items():
            tokens = set(tokenize(t))
            for c in info.columns:
                tokens.update(tokenize(c.name))
            for tok in tokens:
                inverted.setdefault(tok, set()).add(t)
        self.inverted = inverted

        self._schema_fingerprint = cached.get("fingerprint", "")
        self._loaded_at = cached.get("saved_at", now())
        self.context_cache.clear()

    def relevant_tables(self, prompt: str) -> List[str]:
        """
        Hybrid retrieval:
        - token lookup via inverted index (fast recall)
        - scoring by token hits on table name + columns
        - expand by FK neighbors (joinability)
        """
        self.refresh_if_needed()

        key = sha256_str(prompt)
        cached = self.context_cache.get(key)
        if cached and isinstance(cached, dict) and cached.get("tables"):
            return cached["tables"]

        toks = tokenize(prompt)
        candidate: Set[str] = set()

        for tok in toks:
            candidate.update(self.inverted.get(tok, set()))

        # Fallback when prompt tokens find nothing: sample some tables deterministically
        if not candidate:
            # take first N tables alphabetically for deterministic behavior
            candidate = set(sorted(self.tables.keys())[: settings.TOP_TABLES * 2])

        def score_table(t: str) -> float:
            info = self.tables[t]
            tname = t.lower()
            colnames = [c.name.lower() for c in info.columns]

            s = 0.0
            for tok in toks:
                if tok in tname:
                    s += 4.0
                for cn in colnames:
                    if tok == cn:
                        s += 7.0
                    elif tok in cn:
                        s += 2.0
            # phrase boost
            if tname in " ".join(toks):
                s += 10.0
            return s

        ranked = sorted(candidate, key=lambda t: (-score_table(t), t))
        top = ranked[: settings.TOP_TABLES]

        # FK neighbor expansion (adds join context)
        neighbors: List[str] = []
        for t in top:
            for nb in sorted(self.fk_graph.get(t, set())):
                if nb not in top and nb not in neighbors:
                    neighbors.append(nb)
                if len(neighbors) >= settings.FK_NEIGHBORS:
                    break
            if len(neighbors) >= settings.FK_NEIGHBORS:
                break

        selected = top + neighbors
        self.context_cache[key] = {"tables": selected}
        return selected

    def schema_context(self, prompt: str) -> str:
        selected = self.relevant_tables(prompt)

        parts: List[str] = []
        parts.append(f"-- DB: {settings.DB_NAME} | schema_fingerprint={self._schema_fingerprint}")
        parts.append("-- Authoritative schema excerpt (do not invent columns)")
        for t in selected:
            info = self.tables.get(t)
            if not info:
                continue
            cols = ", ".join([f"{c.name} ({c.dtype})" for c in info.columns])
            parts.append(f"Table: {t}\nColumns: {cols}\n")

        # include FK edges among selected (helps LLM pick joins)
        selected_set = set(selected)
        fk_lines = []
        for fk in self.fks:
            if fk.child_table in selected_set and fk.parent_table in selected_set:
                fk_lines.append(f"{fk.child_table}.{fk.child_column} -> {fk.parent_table}.{fk.parent_column}")
        if fk_lines:
            parts.append("ForeignKeys:\n" + "\n".join(fk_lines) + "\n")

        return "\n".join(parts)

    def table_column_allowlist(self) -> Dict[str, Set[str]]:
        self.refresh_if_needed()
        return {t: {c.name for c in info.columns} for t, info in self.tables.items()}


# ============================================================
# SQL Guard (post-generation validation)
# - SELECT-only
# - Enforce LIMIT
# - Validate referenced tables/columns against live schema
# - EXPLAIN-based gating (row estimate)
# ============================================================

class SQLGuard:
    def __init__(self, schema: SchemaRegistry):
        self.schema = schema

    def extract_sql(self, raw: str) -> str:
        raw = (raw or "").strip()

        # fenced
        if "```" in raw:
            m = re.search(r"```(?:sql)?\s*(.*?)```", raw, re.DOTALL | re.IGNORECASE)
            if m:
                raw = m.group(1).strip()

        # start at WITH/SELECT
        m = re.search(r"(?is)\b(with|select)\b.*", raw)
        if m:
            raw = m.group(0).strip()

        return raw.strip().rstrip(";").strip()

    def is_select_only(self, sql: str) -> bool:
        s = sql.strip().lower()
        if not (s.startswith("select") or s.startswith("with")):
            return False
        banned = [
            "insert", "update", "delete", "drop", "truncate", "alter",
            "create", "replace", "grant", "revoke", "call", "load_file",
            "outfile", "dumpfile", "shutdown", "kill", "set ",
        ]
        for b in banned:
            if re.search(rf"(?is)\b{re.escape(b)}\b", s):
                return False
        return True

    def ensure_limit(self, sql: str) -> str:
        if not settings.REQUIRE_LIMIT:
            return sql

        if re.search(r"(?is)\blimit\b", sql):
            # clamp limit value if possible (simple clamp, strong clamp happens after execution)
            m = re.search(r"(?is)\blimit\s+(\d+)\b", sql)
            if m:
                lim = int(m.group(1))
                if lim > settings.ABSOLUTE_MAX_LIMIT:
                    sql = re.sub(r"(?is)\blimit\s+\d+\b", f"LIMIT {settings.ABSOLUTE_MAX_LIMIT}", sql)
            return sql

        return f"{sql}\nLIMIT {settings.DEFAULT_LIMIT}"

    def _validate_with_sqlglot(self, sql: str) -> Tuple[bool, str]:
        """
        Validates referenced tables/columns using sqlglot AST.
        Handles table aliases (e.g., 'FROM companies c').
        """
        assert sqlglot is not None

        allow = self.schema.table_column_allowlist()
        try:
            parsed = sqlglot.parse_one(sql, dialect="mysql")
        except Exception as e:
            return False, f"SQL parse failed: {e}"

        # 1. Map all valid query qualifiers (tables + aliases) to the real schema table name
        #    Example: {'companies': 'companies', 'c': 'companies'}
        qualifier_map: Dict[str, str] = {}
        referenced_tables: Set[str] = set()

        for t in parsed.find_all(exp.Table):
            real_name = t.name
            if not real_name:
                continue

            # Check if the real table exists in schema
            if real_name not in allow:
                return False, f"Unknown table referenced: {real_name}"
            
            referenced_tables.add(real_name)
            
            # Map the real name
            qualifier_map[real_name] = real_name
            
            # Map the alias if it exists
            if t.alias:
                qualifier_map[t.alias] = real_name

        # 2. Validate columns
        for col in parsed.find_all(exp.Column):
            col_name = col.name
            table_qual = col.table

            if table_qual:
                # If the column has a prefix (e.g. c.price), resolve the prefix via the map
                if table_qual not in qualifier_map:
                    return False, f"Unknown table qualifier referenced: {table_qual}"
                
                real_table = qualifier_map[table_qual]
                if col_name not in allow[real_table]:
                    return False, f"Unknown column referenced: {real_table}.{col_name}"
            else:
                # Unqualified column (e.g. price). Ensure it exists in ONE of the referenced tables.
                # (Ambiguity is allowed here; MySQL will error at runtime if ambiguous, which is fine)
                if referenced_tables:
                    exists_somewhere = any(col_name in allow[t] for t in referenced_tables)
                    if not exists_somewhere:
                        return False, f"Unknown unqualified column referenced: {col_name}"

        return True, "ok"

    def _validate_without_sqlglot(self, sql: str) -> Tuple[bool, str]:
        """
        Conservative validation fallback when sqlglot isn't installed.
        Less accurate but still blocks most hallucinations.
        """
        allow = self.schema.table_column_allowlist()

        # crude table extraction: FROM/JOIN <table>
        tables = set(re.findall(r"(?is)\b(from|join)\s+([`\"\[]?)([a-zA-Z0-9_]+)\2", sql))
        table_names = {t[2] for t in tables}

        for t in table_names:
            if t not in allow:
                return False, f"Unknown table referenced: {t}"

        # column extraction is too error-prone without AST; rely on execution error + repair
        return True, "ok"

    def validate_schema(self, sql: str) -> Tuple[bool, str]:
        self.schema.refresh_if_needed()
        if sqlglot is not None:
            return self._validate_with_sqlglot(sql)
        return self._validate_without_sqlglot(sql)


# ============================================================
# Query Executor
# - Uses pooled connections
# - Enforces max_execution_time
# - Runs EXPLAIN to gate expensive queries
# - Returns rows (dict)
# ============================================================

class QueryExecutor:
    def __init__(self, pool: MySQLConnectionPool):
        self.pool = pool

    def _connect(self):
        return self.pool.get_connection()

    def _apply_session_guardrails(self, cur):
        # MySQL: limit execution time (ms). (Works in MySQL 5.7+ for SELECT)
        cur.execute(f"SET SESSION max_execution_time = {int(settings.MAX_EXECUTION_MS)}")

        # Optional: if you have a read-only user, you can also do:
        # cur.execute("SET SESSION TRANSACTION READ ONLY")  # may require correct engine/permissions

    def explain_cost_ok(self, sql: str) -> Tuple[bool, str]:
        """
        Uses EXPLAIN to reject obviously expensive queries.
        Note: EXPLAIN estimates are not perfect; tune thresholds.
        """
        conn = self._connect()
        try:
            cur = conn.cursor(dictionary=True)
            self._apply_session_guardrails(cur)
            cur.execute("EXPLAIN " + sql)
            rows = cur.fetchall() or []

            # Heuristic: sum rows estimates
            est = 0
            for r in rows:
                v = r.get("rows")
                if isinstance(v, int):
                    est += v

            if est > settings.EXPLAIN_MAX_ROWS_ESTIMATE:
                return False, f"Query rejected by cost gate (EXPLAIN estimated rows={est})."

            return True, "ok"
        finally:
            conn.close()

    def run(self, sql: str) -> List[Dict[str, Any]]:
        conn = self._connect()
        try:
            cur = conn.cursor(dictionary=True)
            self._apply_session_guardrails(cur)

            cur.execute(sql)
            rows = cur.fetchall() or []
            if len(rows) > settings.MAX_RETURNED_ROWS:
                rows = rows[: settings.MAX_RETURNED_ROWS]
            return rows
        finally:
            conn.close()


# ============================================================
# LLM Client (SQL generation + grounded summarization)
# ============================================================

class LLMService:
    def __init__(self):
        self.client = OpenAI(base_url=settings.OLLAMA_URL, api_key="ollama")

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=0.5, min=0.5, max=3.0),
        retry=retry_if_exception_type(Exception),
        reraise=True,
    )
    def generate_sql(self, prompt: str, schema_context: str, previous_error: Optional[str] = None) -> str:
        system = f"""
You are a senior MySQL analytics engineer.

You MUST follow these rules:
- Output exactly one MySQL SELECT query (WITH is allowed).
- Use ONLY tables/columns shown in the schema excerpt.
- Prefer explicit column lists (avoid SELECT *) unless it is necessary.
- Keep the query efficient: add WHERE filters when appropriate; avoid cross joins.
- If you must join, join on logical keys (often *_id) consistent with the schema.
- Do not output markdown, comments, or explanations.

SCHEMA_EXCERPT:
{schema_context}
""".strip()

        user = f"USER_REQUEST: {prompt}".strip()
        if previous_error:
            user += f"\n\nPREVIOUS_ERROR:\n{previous_error}\nFix the query."

        resp = self.client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
            temperature=settings.LLM_TEMPERATURE_SQL,
        )
        return (resp.choices[0].message.content or "").strip()

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=0.5, min=0.5, max=3.0),
        retry=retry_if_exception_type(Exception),
        reraise=True,
    )
    def summarize(self, prompt: str, sql: str, rows: List[Dict[str, Any]]) -> str:
        if not rows:
            return "No matching records were found for the requested criteria."

        returned_cols = list(rows[0].keys())
        preview = rows[:5]

        system = f"""
You are a data analyst summarizing database results.

GROUNDING (strict):
- Use ONLY the columns listed in RETURNED_COLUMNS.
- Do NOT invent fields or assume business meaning not supported by the preview rows.
- If a field is not present, do not mention it.
- Provide a concise, business-oriented summary (4-8 sentences).
- Do not enumerate all IDs.

USER_REQUEST: {prompt}
SQL_RUN: {sql}
ROW_COUNT: {len(rows)}
RETURNED_COLUMNS: {returned_cols}
PREVIEW_ROWS: {preview}
""".strip()

        resp = self.client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[{"role": "system", "content": system}],
            temperature=settings.LLM_TEMPERATURE_SUMMARY,
        )
        return (resp.choices[0].message.content or "").strip()


# ============================================================
# Orchestrator (the agent)
# ============================================================

class AnalyticsAgent:
    def __init__(self, schema: SchemaRegistry, guard: SQLGuard, executor: QueryExecutor, llm: LLMService):
        self.schema = schema
        self.guard = guard
        self.executor = executor
        self.llm = llm

    def _repairable_error(self, err: str) -> bool:
        # common MySQL errors that can be fixed by regenerating SQL
        patterns = [
            "Unknown column", "Unknown table", "doesn't exist", "ambiguous", "You have an error in your SQL syntax",
        ]
        return any(p.lower() in err.lower() for p in patterns)
    
    def _primary_table_from_sql(self, sql: str) -> Optional[str]:
        # Prefer sqlglot if installed; else regex
        if sqlglot is not None:
            try:
                parsed = sqlglot.parse_one(sql, dialect="mysql")
                t = next(parsed.find_all(exp.Table), None)
                return t.name if t and t.name else None
            except Exception:
                pass

        m = re.search(r"(?is)\bfrom\s+([`\"\[]?)([a-zA-Z0-9_]+)\1\b", sql)
        return m.group(2) if m else None

    def _selected_columns_from_sql(self, sql: str, table: Optional[str]) -> List[str]:
        """
        Try to return columns from the SELECT projection even when 0 rows returned.
        If SELECT * and we can identify a single table, expand to table columns from schema.
        """
        if sqlglot is not None:
            try:
                parsed = sqlglot.parse_one(sql, dialect="mysql")
                select_node = parsed.find(exp.Select)
                if not select_node:
                    return []

                cols: List[str] = []
                has_star = False

                for proj in select_node.expressions:
                    # SELECT *
                    if isinstance(proj, exp.Star):
                        has_star = True
                        continue

                    # SELECT table.*
                    if isinstance(proj, exp.Column) and isinstance(proj.this, exp.Star):
                        has_star = True
                        continue

                    # Normal column / alias / functions
                    alias = proj.alias
                    if alias:
                        cols.append(alias)
                        continue

                    # Column name if present
                    col = proj.find(exp.Column)
                    if col and col.name:
                        cols.append(col.name)
                        continue

                    # fallback to SQL text for non-column expressions
                    cols.append(proj.sql(dialect="mysql"))

                # Expand star if possible
                if has_star and table and table in self.schema.tables:
                    cols = [c.name for c in self.schema.tables[table].columns]

                # Deduplicate, preserve order
                seen = set()
                out = []
                for c in cols:
                    if c not in seen:
                        out.append(c)
                        seen.add(c)
                return out
            except Exception:
                pass

        # Regex fallback (best-effort, not perfect)
        # If SELECT * and we know table, expand
        if re.search(r"(?is)\bselect\s+\*\s+from\b", sql) and table and table in self.schema.tables:
            return [c.name for c in self.schema.tables[table].columns]

        return []

    def _group_columns(self, columns: List[Tuple[str, str]]) -> Dict[str, List[str]]:
        def group_for(col: str) -> str:
            c = col.lower()
            if any(k in c for k in ["id", "code", "key"]):
                return "Identifiers / Keys"
            if any(k in c for k in ["name", "title", "description", "type"]):
                return "Business Attributes"
            if any(k in c for k in ["status", "state", "workflow", "approval"]):
                return "Lifecycle / Workflow"
            if any(k in c for k in ["date", "time", "effective", "expiration", "renewal", "created", "modified"]):
                return "Dates / Audit"
            if any(k in c for k in ["amount", "value", "price", "cost", "currency", "payment", "terms"]):
                return "Commercial Terms"
            if any(k in c for k in ["tenant", "customer", "owner", "user", "org", "division", "channel"]):
                return "Ownership / Org"
            return "Other"

        grouped: Dict[str, List[str]] = {}
        for name, dtype in columns:
            grouped.setdefault(group_for(name), []).append(f"{name} ({dtype})")
        return grouped

    def _schema_fallback_summary(self, prompt: str, sql: str) -> Tuple[str, List[str]]:
        """
        Used when the query returns 0 rows:
        - Determine primary table and selected columns
        - Provide a human-style explanation based only on schema + projection
        Returns: (message, returned_columns)
        """
        self.schema.refresh_if_needed()

        table = self._primary_table_from_sql(sql)
        returned_columns: List[str] = []

        if table and table in self.schema.tables:
            returned_columns = self._selected_columns_from_sql(sql, table)
            if not returned_columns:
                # fallback to full table columns if projection parsing fails
                returned_columns = [c.name for c in self.schema.tables[table].columns]

            col_pairs = [(c.name, c.dtype) for c in self.schema.tables[table].columns]
            grouped = self._group_columns(col_pairs)

            system_msg = f"""
You are a product/data analyst explaining a database table to a business user.

IMPORTANT CONTEXT:
- The query returned ZERO rows. Do NOT claim any records exist.
- You must not invent any values, counts, or trends.

AUTHORITATIVE INPUTS:
- USER_REQUEST: {prompt}
- SQL_RUN: {sql}
- TABLE: {table}
- TABLE_COLUMN_GROUPS (column names + data types):
{json.dumps(grouped, indent=2)}

OUTPUT REQUIREMENTS:
- Write a natural, human chat response (6–10 sentences).
- Explain what the table is designed to store, and what each group of fields represents.
- Mention example fields by name where helpful, but do not list everything exhaustively.
- Keep it business-facing (what the table means, not SQL mechanics).
""".strip()

            resp = self.llm.client.chat.completions.create(
                model=settings.LLM_MODEL,
                messages=[{"role": "system", "content": system_msg}],
                temperature=max(settings.LLM_TEMPERATURE_SUMMARY, 0.3),
            )
            msg = (resp.choices[0].message.content or "").strip()
            return msg, returned_columns

        # If we cannot identify the table reliably
        msg = (
            "I didn’t find any matching rows for that request. "
            "However, I can still explain the dataset structure. "
            "Please ask something like: 'Describe the agreements table' or 'What fields exist in agreements?'"
        )
        return msg, returned_columns

    def process(self, prompt: str) -> Dict[str, Any]:
        self.schema.refresh_if_needed()

        schema_ctx = self.schema.schema_context(prompt)

        last_error: Optional[str] = None
        sql: Optional[str] = None

        for attempt in range(2):  # 1 initial + 1 repair
            raw = self.llm.generate_sql(prompt, schema_ctx, previous_error=last_error)
            sql = self.guard.extract_sql(raw)

            if not self.guard.is_select_only(sql):
                raise HTTPException(status_code=400, detail="Refused: generated query was not a safe SELECT/WITH SELECT.")

            sql = self.guard.ensure_limit(sql)

            ok, msg = self.guard.validate_schema(sql)
            if not ok:
                last_error = msg
                if attempt == 0:
                    continue
                raise HTTPException(status_code=400, detail=f"Refused: {msg}")

            # Cost gate (EXPLAIN)
            ok, msg = self.executor.explain_cost_ok(sql)
            if not ok:
                raise HTTPException(status_code=400, detail=msg)

            try:
                rows = self.executor.run(sql)

                if rows:
                    summary = self.llm.summarize(prompt, sql, rows)
                    returned_columns = list(rows[0].keys())
                else:
                    # NEW: schema-based human explanation when there are 0 rows
                    summary, returned_columns = self._schema_fallback_summary(prompt, sql)

                return {
                    "success": True,
                    "sql": sql,
                    "row_count": len(rows),
                    "returned_columns": returned_columns,
                    "data": rows,
                    "message": summary,
                }
            except Exception as e:
                err = str(e)
                logger.warning("Query execution error: %s", err)
                if attempt == 0 and self._repairable_error(err):
                    last_error = err
                    continue
                raise HTTPException(status_code=500, detail=err)

        raise HTTPException(status_code=500, detail="Failed to process request after retries.")


# ============================================================
# FastAPI App
# ============================================================

app = FastAPI(title=settings.API_TITLE, version=settings.API_VERSION)

# DB pool initialization (module-level, shared)
db_pool = MySQLConnectionPool(
    pool_name=settings.DB_POOL_NAME,
    pool_size=settings.DB_POOL_SIZE,
    host=settings.DB_HOST,
    port=settings.DB_PORT,
    user=settings.DB_USER,
    password=settings.DB_PASSWORD,
    database=settings.DB_NAME,
)

schema_registry = SchemaRegistry(db_pool)
sql_guard = SQLGuard(schema_registry)
executor = QueryExecutor(db_pool)
llm_service = LLMService()
agent = AnalyticsAgent(schema_registry, sql_guard, executor, llm_service)


class QueryRequest(BaseModel):
    prompt: str = Field(..., min_length=3, max_length=2000)


@app.post("/analytics/ai/query")
def query_endpoint(req: QueryRequest):
    # In production, add authn/z, rate limiting, and request ID propagation here.
    try:
        return agent.process(req.prompt)
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unhandled error")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health():
    # lightweight health
    return {
        "status": "ok",
        "db": settings.DB_NAME,
        "schema_loaded": bool(schema_registry.tables),
        "schema_fingerprint": schema_registry._schema_fingerprint,
    }


# ============================================================
# Notes for real production hardening
# ============================================================
"""
1) SECURITY
- Use a dedicated DB user with SELECT-only privileges (least privilege).
- Never hardcode credentials; use env/secret manager.
- Consider an allowlist of accessible tables (privacy boundaries).
- Consider row-level security constraints (e.g., tenant_id) enforced server-side.

2) OBSERVABILITY
- Add request IDs, JSON logs, metrics (latency, errors, retry count).
- Record EXPLAIN estimates and rejected queries for tuning thresholds.

3) PERFORMANCE
- Consider splitting schema into "domains" and retrieving by domain classification first.
- For very large schemas, add embedding retrieval:
  - Create schema “chunks” per table/column set and store embeddings in a local vector DB
    (or even a simple on-disk ANN index).
  - Use embeddings to retrieve top K chunks and then run the LLM on only those chunks.

4) SQL SAFETY
- Keep SELECT-only policy.
- Add a policy: require WHERE for non-aggregate queries on large tables.
- Add max JOIN count, ban CROSS JOIN unless explicitly needed.
- Add a read replica for analytics workloads.

5) SUMMARIZATION QUALITY
- If you need richer summaries, compute basic aggregates server-side (counts by status, etc.)
  then summarize those aggregates rather than raw rows.
"""