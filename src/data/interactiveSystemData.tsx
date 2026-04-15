import { 
    Server, Cpu, Database, Network, Shield, Workflow, 
    Smartphone, Zap, Lock, BookOpen, Layers, CreditCard,
    type LucideIcon
} from "lucide-react";
import { Edge, Node } from "reactflow";

// Common Node Styling function
const n = (id: string, label: string, x: number, y: number, className = 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/20 text-zinc-700 dark:text-zinc-300 rounded-lg shadow-md dark:shadow-xl text-xs font-bold uppercase tracking-wide px-4 py-2') => ({
    id, position: { x, y }, data: { label }, className
});
const e = (id: string, source: string, target: string, animated = true, stroke = '#3b82f6') => ({
    id, source, target, animated, style: { stroke, strokeWidth: 2 }
});

export type PanelData = {
    title: string;
    tech: string[];
    description: string;
    icon: LucideIcon;
};

export type SystemData = {
    nodes: Node[];
    edges: Edge[];
    panelMap: Record<string, PanelData>;
};

export const getSystemData = (projectId: string): SystemData | null => {
    switch (projectId) {
        case "container-orchestration": // AuraDeploy
            return {
                nodes: [
                    n("api", "API & Admission", 250, 0),
                    n("raft", "Raft Master (FSM)", 250, 100, "bg-blue-50 dark:bg-blue-900/40 border-blue-300 dark:border-blue-500/50 text-blue-700 dark:text-blue-100 rounded-lg shadow-md dark:shadow-xl text-xs font-bold uppercase tracking-wide px-4 py-2"),
                    n("sched", "Custom Scheduler", 50, 200),
                    n("worker", "CRI-O / Containerd", 450, 200),
                    n("csi", "Custom CSI Storage", 450, 300),
                    n("gitops", "GitOps Reconciler", 50, 100)
                ] as Node[],
                edges: [
                    e("e1", "api", "raft"),
                    e("e2", "raft", "sched"),
                    e("e3", "raft", "worker"),
                    e("e4", "worker", "csi"),
                    e("e5", "gitops", "raft", true, "#10b981")
                ] as Edge[],
                panelMap: {
                    "api": {
                        title: "API & Admission Control",
                        tech: ["JWT", "RBAC", "Validating Webhooks"],
                        description: "Extracts Bearer tokens and authorizes subjects against internal FSM RoleBindings. Intercepts layouts to strip Privileged Containers mapping to PodSecurityStandards.",
                        icon: Shield
                    },
                    "raft": {
                        title: "Raft Consensus Master",
                        tech: ["Go", "HashiCorp Raft", "Embedded KV"],
                        description: "The core Finite State Machine ensuring cluster-wide consistency via Write-Ahead Logs. Handles leader elections securely without relying on extreme external DBs like etcd.",
                        icon: Database
                    },
                    "sched": {
                        title: "Custom Scheduler Algorithms",
                        tech: ["Go-routines", "Bin-packing Algorithm"],
                        description: "Iterates over Raft logs to discover pending replicas. Evaluates hard constraints and scores optimal nodes (LeastAllocated) ensuring efficient CPU/Memory footprints.",
                        icon: Cpu
                    },
                    "worker": {
                        title: "CRI-O / Containerd Worker",
                        tech: ["netlink", "CGroups", "OCI"],
                        description: "Acts as native CRI client. Downloads OCI images, mounts network namespaces manually via netlink, and injects CGroup isolation.",
                        icon: Server
                    },
                    "csi": {
                        title: "Local CSI Provisioner",
                        tech: ["Container Storage Interface", "Host-paths"],
                        description: "Embedded reconciliation loop provisioning localized host-paths mapping 1:1 against Persistent Volume Claims (PVCs) for stateful data binding.",
                        icon: Layers
                    },
                    "gitops": {
                        title: "Declarative GitOps Engine",
                        tech: ["yaml.v3", "Drift Checker"],
                        description: "Parses Kubernetes-style schemas and diff-checks local active state versus remote declarative definitions to heal drifted ENV vars or replica bounds instantly.",
                        icon: Workflow
                    }
                }
            };
            
        case "enterprise-rag": // HGPT
            return {
                nodes: [
                    n("api", "FastAPI Gateway", 250, 0),
                    n("celery", "Celery Async Workers", 50, 100, "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg shadow-md dark:shadow-xl text-xs font-bold uppercase tracking-wide px-4 py-2"),
                    n("hybrid", "Hybrid Query Expansion", 250, 100, "bg-purple-50 dark:bg-purple-900/40 border-purple-300 dark:border-purple-500/50 text-purple-700 dark:text-purple-100 rounded-lg shadow-md dark:shadow-xl text-xs font-bold uppercase tracking-wide px-4 py-2"),
                    n("chroma", "ChromaDB (Dense)", 150, 200),
                    n("bm25", "Distributed BM25", 350, 200),
                    n("rrf", "Reciprocal Rank Fusion", 250, 300),
                    n("llm", "Ollama LLM Stream", 250, 400, "bg-green-50 dark:bg-green-900/40 border-green-300 dark:border-green-500/50 text-green-700 dark:text-green-100 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:shadow-[0_0_15px_rgba(16,185,129,0.3)] text-xs font-bold uppercase tracking-wide px-4 py-2")
                ] as Node[],
                edges: [
                    e("e1", "api", "celery", true, "#52525b"),
                    e("e2", "api", "hybrid"),
                    e("e3", "hybrid", "chroma", true, "#a855f7"),
                    e("e4", "hybrid", "bm25", true, "#a855f7"),
                    e("e5", "chroma", "rrf"),
                    e("e6", "bm25", "rrf"),
                    e("e7", "rrf", "llm", true, "#10b981")
                ] as Edge[],
                panelMap: {
                    "api": {
                        title: "FastAPI Rate-Limited Gateway",
                        tech: ["FastAPI", "Redis", "Pydantic"],
                        description: "Validates incoming queries rapidly while checking strict sliding-window rate limits via Redis to prevent unauth LLM abuse.",
                        icon: Shield
                    },
                    "celery": {
                        title: "Heavy Document Ingestion",
                        tech: ["Celery", "Redis", "PyMuPDF"],
                        description: "Background processing of 50MB+ PDFs asynchronously, utilizing GPU parallelization so the UI thread doesn't freeze.",
                        icon: Layers
                    },
                    "hybrid": {
                        title: "Query Expansion Routing",
                        tech: ["Ollama Llama 3", "Circuit Breakers"],
                        description: "Injects queries to an LLM explicitly configured to output 3 distinct variations of a phrase, mathematically boosting recall probabilities later down the pipeline.",
                        icon: Network
                    },
                    "chroma": {
                        title: "Dense Semantic Embeddings",
                        tech: ["ChromaDB", "HNSW Index", "Nomic-Embed"],
                        description: "Performs mathematical K-Nearest Neighbors searches over highly compressed float32 text embeddings to retrieve contextual themes, regardless of exact keyword matches.",
                        icon: Database
                    },
                    "bm25": {
                        title: "Lexical Sparse Index",
                        tech: ["Elasticsearch", "BM25"],
                        description: "Analyzes explicit text term frequencies ensuring that specific noun references (e.g. 'TurboQuant') are never lost to semantic noise.",
                        icon: BookOpen
                    },
                    "rrf": {
                        title: "RRF & Cross-Encoder",
                        tech: ["Reciprocal Rank Fusion", "ms-marco-MiniLM"],
                        description: "Normalizes dense and sparse rankings into a unified score dataset, trimming to Top K candidates that are subsequently mathematically reranked by an intensive Cross-Encoder.",
                        icon: Cpu
                    },
                    "llm": {
                        title: "LLM Streaming Compression",
                        tech: ["Ollama", "tiktoken"],
                        description: "Squeezes highly filtered contextual responses directly into the physical prompt payload and maps Server-Sent Events (SSE) chunks to stream tokens.",
                        icon: Zap
                    }
                }
            };

        case "transit-reservation": // ShuttleNow
            return {
                nodes: [
                    n("clients", "React & Native Clients", 250, 0),
                    n("socket", "WebSocket Auth Layer", 250, 100, "bg-blue-50 dark:bg-blue-900/40 border-blue-300 dark:border-blue-500/50 text-blue-700 dark:text-blue-100 rounded-lg shadow-md dark:shadow-xl text-xs font-bold uppercase tracking-wide px-4 py-2"),
                    n("redis", "Redis Redlock (Hold)", 100, 200),
                    n("mongo", "MongoDB Cluster", 400, 200),
                    n("stripe", "Stripe PCI Webhooks", 250, 300)
                ] as Node[],
                edges: [
                    e("e1", "clients", "socket", true, "#3b82f6"),
                    e("e2", "socket", "redis", true, "#ef4444"),
                    e("e3", "socket", "mongo"),
                    e("e4", "socket", "stripe", true, "#8b5cf6")
                ] as Edge[],
                panelMap: {
                    "clients": {
                        title: "Unified Multi-Platform Client",
                        tech: ["React.js", "React Native", "Framer Motion"],
                        description: "Provides distinct user portals and responsive Admin dashboards. Embeds live interactive seat layout maps synced perfectly to state.",
                        icon: Smartphone
                    },
                    "socket": {
                        title: "Socket.IO Sync Gateway",
                        tech: ["Node.js", "Socket.IO", "JWT"],
                        description: "Decodes JWT auth boundaries and establishes a persistently open bidirectional channel broadcasting location geometry and instantaneous seat states globally.",
                        icon: Network
                    },
                    "redis": {
                        title: "Distributed Seat Locking",
                        tech: ["Redis", "Pessimistic Concurrency"],
                        description: "Acquires a temporal TTL distributed lock precisely the second a user taps a transit seat. It instantly rejects colliding booking requests attempting to query the exact same block.",
                        icon: Lock
                    },
                    "mongo": {
                        title: "Document Graph Aggregation",
                        tech: ["MongoDB", "Mongoose"],
                        description: "Validates complex booking relationships maintaining dynamic geo-coordinate history, booking schemas, and live mapping attributes.",
                        icon: Database
                    },
                    "stripe": {
                        title: "Asynchronous Financial Gateway",
                        tech: ["Stripe Webhooks", "AWS Lambda"],
                        description: "De-risks sensitive payment handling by moving transactions strictly to an isolated PCI-compliant backend trigger producing verifiable Digital QR Tickets on success.",
                        icon: CreditCard
                    }
                }
            };
            
        default:
            return null;
    }
}
