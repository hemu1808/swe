export interface ExperiencePoint {
  title: string;
  description: string;
  icon: "Zap" | "Server" | "Code2" | "Terminal" | "Rocket" | "Cpu" | "Shield" | "Database" | "Layers";
}

export interface CaseStudyData {
  subtitle?: string;
  businessProblem: string[];
  architecture: string[];
  whyArchitecture: string[];
  alternativeApproaches: string[];
  tradeoffs: string[];
  biggestTechnicalChallenge: string;
  biggestProductionIssue: string;
  biggestMistake: string;
  scaling: string[];
  security: string[];
  performance: string[];
  lessonsLearned: string[];
  followUpQuestions: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  techStack: string[];
  points: ExperiencePoint[];
  caseStudy?: CaseStudyData;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "leapgen-ai",
    role: "AI Python Engineer",
    company: "LeapGen AI",
    location: "Ashburn, VA",
    period: "May 2025 - Present",
    isCurrent: true,
    techStack: [
      "Python",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "Azure OpenAI",
      "GPT-4o",
      "Docker",
      "Terraform",
      "GitHub Actions",
      "MCP",
      "RAG",
    ],
    points: [
      {
        icon: "Cpu",
        title: "Retrieval-Augmented Generation (RAG) Pipelines",
        description:
          "Built Retrieval-Augmented Generation pipelines using LangChain, vector databases, and document embedding/ingestion workflows, improving knowledge-retrieval accuracy and reducing irrelevant chatbot responses.",
      },
      {
        icon: "Layers",
        title: "LangGraph & MCP Workflow Automation",
        description:
          "Orchestrated AI workflow automation using LangGraph and Model Context Protocol (MCP), driving document analysis, multi-step reasoning, and task execution across business processes.",
      },
      {
        icon: "Zap",
        title: "Production FastAPI & Azure OpenAI Inference Services",
        description:
          "Built production FastAPI services integrating OpenAI GPT-4o and Azure OpenAI into enterprise AI workflows, optimizing prompt orchestration, context management, and API performance for reliable LLM inference.",
      },
      {
        icon: "Server",
        title: "AI Observability & Performance Tracing",
        description:
          "Improved AI application observability by implementing structured logging, tracing, and performance analysis.",
      },
      {
        icon: "Rocket",
        title: "Azure Infrastructure & CI/CD Delivery",
        description:
          "Deployed and maintained Azure infrastructure using Docker, Terraform, and GitHub Actions, enabling CI/CD delivery.",
      },
      {
        icon: "Code2",
        title: "Seismic & DataCoffee Platform Engineering",
        description:
          "Delivered features across Seismic (healthcare platform - billing/subscription management, clinical workflows, system integrations) and DataCoffee (AI data-pipeline builder), owning implementation from backend APIs to production deployment.",
      },
    ],
    caseStudy: {
      subtitle: "Enterprise GenAI Platform & Multi-Agent Workflow Engine",
      businessProblem: [
        "Internal + client-facing generative AI platform work — enterprise knowledge retrieval/chat, and automating multi-step business processes for clients.",
        "Two active client tracks: Seismic (healthcare practice-management suite) and DataCoffee/ModelHub (multi-model AI chat product).",
      ],
      architecture: [
        "RAG ingestion/retrieval pipelines (LangChain, vector DB, embeddings); LangGraph + MCP for multi-step agent orchestration and tool calling.",
        "FastAPI services fronting GPT-4o and Azure OpenAI; Azure deployment via Docker, Terraform, GitHub Actions.",
        "Structured logging + tracing for full observability across LLM inference latency and token counts.",
        "Seismic Platform: DoctorApp billing/subscriptions, guided tours, SOAP note generation, appointments/clinic integration; Patient Portal docs and pages; new Seismic Pet app initiation.",
        "DataCoffee / ModelHub: React/TypeScript frontend, model switcher across Claude/GPT/Gemini, team workspaces, usage billing, a drag-and-drop pipeline builder, and a React Native companion app.",
      ],
      whyArchitecture: [
        "MCP standardizes how an agent calls external tools/data instead of writing custom, brittle glue code per integration.",
        "A thin API layer separate from the LLM orchestration layer makes it easier to swap providers per client compliance needs — critical when healthcare-adjacent data must remain in specific regions/tenants.",
      ],
      alternativeApproaches: [
        "Hardcoded prompt chains per feature instead of LangGraph — rejected once workflows required conditional branching or human-in-the-loop steps that linear chains cannot model.",
        "Direct OpenAI SDK function-calling instead of MCP — rejected because MCP allows tool definitions to be reused seamlessly across different agents and clients.",
      ],
      tradeoffs: [
        "MCP and LangGraph introduce infrastructure and conceptual overhead compared to simple prompt chains — highly worth it once managing multiple tools/agents, but overkill for simple single-turn bots.",
        "Azure OpenAI trades minor model freshness/latency for strict data residency and contractual compliance guarantees — essential for healthcare clients.",
      ],
      biggestTechnicalChallenge:
        "Getting SOAP note generation (Seismic DoctorApp) to produce reliably structured, clinically-formatted output across diverse visit types without model drift on edge cases — solved via tightly constrained JSON schemas and post-generation validation parsers.",
      biggestProductionIssue:
        "An early version of the RAG ingestion path re-embedded entire documents on every minor edit instead of diffing — quietly inflating embedding API costs before structured tracing caught it.",
      biggestMistake:
        "Underestimated how much of AI workflow automation is fundamental backend plumbing (auth, permissions, retries, audit logging) versus prompt engineering; early sprints spent too much time prompt-tuning before tracing existed to measure true impact.",
      scaling: [
        "Containerized microservices on Azure so client workloads (Seismic, DataCoffee) scale independently under peak demand.",
        "MCP/LangGraph orchestration decouples tool-calling logic from client frontends, allowing new client integrations to reuse existing agent scaffolding.",
      ],
      security: [
        "HIPAA-compliant data handling for Seismic — securing billing, SOAP notes, and patient-adjacent data.",
        "Compliance framework support covering SOC2, ISO 27001, HIPAA, and GDPR with detailed audit logging and RBAC.",
      ],
      performance: [
        "Built structured logging and tracing specifically to detect latency spikes and error-rate regressions in LLM inference.",
      ],
      lessonsLearned: [
        "Build the observability and tracing layer BEFORE optimizing prompts or pipelines — otherwise you are guessing.",
        "MCP is worth the initial setup cost as soon as you have more than one tool or agent to maintain.",
      ],
      followUpQuestions: [
        "How do you handle PHI/HIPAA constraints when calling an external LLM API?",
        "What does MCP actually give you that normal function calling doesn't?",
        "How do you evaluate whether a RAG answer is good enough for a client like this?",
      ],
    },
  },
  {
    id: "smartrev-iq",
    role: "Software Engineer",
    company: "SmartRevIQ",
    location: "Delaware, DE",
    period: "Jun 2023 - Apr 2025",
    techStack: [
      "React",
      "TypeScript",
      "AWS DynamoDB",
      "LangGraph",
      "AWS S3",
      "REST API",
      "SSO / RBAC",
      "Tailwind CSS",
      "React Hook Form",
    ],
    points: [
      {
        icon: "Database",
        title: "High-Throughput Asynchronous Data Pipelines & REST APIs",
        description:
          "Built scalable asynchronous data pipelines and REST APIs on AWS DynamoDB with client-side validation, processing thousands of enterprise pricing transactions at sub-3-second query performance for analytics workflows.",
      },
      {
        icon: "Code2",
        title: "Dynamic Schema-Driven Form Engine & Analytics Dashboards",
        description:
          "Designed a dynamic form-rendering engine with nested validation and reusable schemas, powering new pricing UI flows across the platform and Built Dashboards with drill-down filtering, surfacing pricing analytics to identify margin leakage.",
      },
      {
        icon: "Layers",
        title: "LangGraph AI Pricing Workflow Automation",
        description:
          "Automated enterprise pricing workflows by deploying AI agents with LangGraph, reducing operational overhead.",
      },
      {
        icon: "Shield",
        title: "Enterprise SSO & Role-Based Access Control",
        description:
          "Implemented SSO authentication and Role-Based Access Control (RBAC), securing multi-tenant access to sensitive datasets.",
      },
    ],
    caseStudy: {
      subtitle: "Multi-Tenant Revenue Management & Dynamic Schema Platform",
      businessProblem: [
        "Multi-tenant enterprise pricing & revenue management platform.",
        "Customers needed to model complex pricing, promotions, claims, discounts, chargebacks, rebates, commissions, and margin leakage — requiring highly configurable tenant-specific workflows rather than standard CRUD.",
      ],
      architecture: [
        "React frontend featuring a JSON-schema-driven dynamic form engine (React Hook Form) rendering nested conditional fields per tenant config.",
        "REST APIs built on AWS DynamoDB with strict schema validation.",
        "Bulk ingestion bypasses the API gateway entirely using pre-signed S3 URLs and asynchronous polling for large CSV/Excel files.",
        "SSO + RBAC for multi-tenant isolation; LangGraph agents automate repetitive pricing approval and calculation steps.",
      ],
      whyArchitecture: [
        "Schema-driven UI scales across tenants without requiring frontend redeployments whenever a customer launches a new pricing program.",
        "Direct-to-S3 file uploads completely avoid API Gateway payload limits (10MB) and lambda execution timeout constraints during large file ingestions.",
      ],
      alternativeApproaches: [
        "Building fixed forms per workflow type — rejected because it could not scale to handle custom tenant pricing rules.",
        "Proxying large file uploads through the API server — rejected after hitting memory and timeout limits; replaced with pre-signed S3 upload links and async background jobs.",
      ],
      tradeoffs: [
        "Schema-driven forms provide ultimate flexibility, but debugging requires inspecting JSON schema payloads rather than simple UI components.",
        "Asynchronous polling for bulk file uploads adds UX complexity (progress spinners, retry handling, error toasts) compared to simple synchronous POST requests.",
      ],
      biggestTechnicalChallenge:
        "Engineering bulk ingestion at scale — the original synchronous upload route repeatedly timed out on large enterprise files prior to the pre-signed S3 re-architecture.",
      biggestProductionIssue:
        "A search filter that performed well for small tenants triggered slow full-table scans on a tenant with 100K+ line items — resolved by re-architecting DynamoDB GSI keys and introducing cursor pagination.",
      biggestMistake:
        "Initially treated the dynamic form engine validation as purely client-side — an edge case in custom schema creation let a malformed payload bypass validation; added server-side schema verification as a mandatory second pass.",
      scaling: [
        "Custom DynamoDB partition key design for strict tenant isolation; pagination + async polling prevented API server memory spikes.",
        "Analytics dashboards tuned for sub-3-second query responses across thousands of concurrent pricing transactions.",
      ],
      security: [
        "SSO authentication, tenant-scoped RBAC, and strictly time-limited pre-signed S3 URLs to prevent cross-tenant data access.",
      ],
      performance: [
        "Achieved sub-3-second query response times across thousands of enterprise pricing transactions.",
      ],
      lessonsLearned: [
        "Validate at both client and server layers from day one when working with dynamic schema-driven inputs.",
        "Adopt direct-to-storage uploads as soon as payload volumes approach gateway or server timeout limits.",
      ],
      followUpQuestions: [
        "How did you version pricing schemas across tenants without breaking existing forms?",
        "What specifically did the LangGraph agents automate — walk me through one workflow?",
        "What happens if two admins edit the same pricing schema at once?",
      ],
    },
  },
  {
    id: "speeler-tech",
    role: "Software Engineer",
    company: "Speeler Technologies",
    location: "Hyderabad, India",
    period: "Apr 2021 – May 2023",
    techStack: [
      "React",
      "GraphQL",
      "AWS AppSync",
      "DynamoDB",
      "AWS Lambda",
      "SQS",
      "AWS ECS Fargate",
      "TensorFlow",
      "Docker",
      "WebSockets",
    ],
    points: [
      {
        icon: "Zap",
        title: "GraphQL Architecture & Resolver Optimization",
        description:
          "Architected and led the redesign of GraphQL backend services for a high-traffic e-commerce platform, implementing DataLoader-style resolver batching - AWS AppSync response caching to cut P95 latency by 30%.",
      },
      {
        icon: "Server",
        title: "Multi-Tenant DynamoDB Single-Table Architecture",
        description:
          "Designed a multi-tenant DynamoDB single-table architecture with sparse GSIs and composite sort keys, eliminating hot-partition bottlenecks and sustaining sub-10ms reads under high-cardinality access patterns, ensuring idempotency.",
      },
      {
        icon: "Code2",
        title: "Event-Driven Image Pipeline & Cost Optimization",
        description:
          "Engineered a fault-tolerant, event-driven image-processing pipeline on AWS Lambda and SQS with dead-letter queue handling, cutting infrastructure costs by 70% while processing 2M+ monthly events at 99.99% data durability.",
      },
      {
        icon: "Terminal",
        title: "Real-Time Collaborative E-Commerce Platform",
        description:
          "Built a real-time collaborative Business Automation & Data Processing E-Commerce Platform with React and WebSockets for concurrent users, reducing perceived latency by 50ms.",
      },
      {
        icon: "Rocket",
        title: "Zero-Downtime ECS Fargate Migrations & CI/CD",
        description:
          "Migrated EC2 workloads to AWS ECS Fargate with Blue/Green deployments and container-level health checks wired into CI/CD, achieving zero-downtime releases across a 50K+ user production system.",
      },
      {
        icon: "Cpu",
        title: "TensorFlow Demand-Forecasting Model",
        description:
          "Built a TensorFlow-based demand-forecasting model for e-commerce inventory planning, visualizing forecast trends and accuracy with Matplotlib for stakeholder reporting.",
      },
    ],
    caseStudy: {
      subtitle: "High-Scale GraphQL & Event-Driven E-Commerce Infrastructure",
      businessProblem: [
        "High-traffic e-commerce platform (50k+ daily requests) with a legacy backend buckling under N+1 query patterns and database hot partitions as tenant count expanded.",
      ],
      architecture: [
        "GraphQL backend featuring DataLoader-style resolver batching and AWS AppSync response caching with tuned TTL policies.",
        "Multi-tenant DynamoDB single-table schema — composite sort keys, sparse GSIs, and write-sharded partition keys.",
        "Event-driven image pipeline utilizing S3, AWS Lambda, SQS Dead Letter Queues (DLQ), and idempotency keys.",
        "React frontend with optimistic UI updates and WebSocket conflict resolution; AWS ECS Fargate container orchestration with Blue/Green deployments.",
      ],
      whyArchitecture: [
        "Single-table DynamoDB design avoids join overhead and hot-partition issues that occur when running 200+ tenants on shared relational infrastructure.",
        "DataLoader batching and AppSync caching directly solved N+1 resolver performance bottlenecks — fixing the true root cause of P95 latency spikes.",
      ],
      alternativeApproaches: [
        "A relational database schema for high-volume access — rejected after load tests proved single-table DynamoDB sustained identical access patterns without hot partitions.",
        "Synchronous image processing — rejected as volume scaled; replaced with an asynchronous Lambda + SQS queue pipeline.",
      ],
      tradeoffs: [
        "Single-table DynamoDB provides extreme speed and low cost for pre-planned access patterns, but ad-hoc reporting queries require new GSIs or data migration.",
        "Per-resolver caching required more configuration than full-response caching, but eliminated the risk of serving stale or user-specific shopping cart data.",
      ],
      biggestTechnicalChallenge:
        "Identifying 12 hidden resolver chains exhibiting N+1 patterns — uncovered by profiling production GraphQL query execution plans rather than simple code inspection.",
      biggestProductionIssue:
        "Synchronous image uploads occasionally backed up the primary web request thread; resolved via Lambda+SQS with DLQs, though initial alerting gaps required refining DLQ monitoring.",
      biggestMistake:
        "Deployed optimistic UI cart updates before conflict-resolution logic was fully hardened — leading to temporary state divergence on concurrent updates; resolved by adding exponential backoff retries and server state reconciliation.",
      scaling: [
        "Sustained sub-10ms p99 reads across 200+ tenants and 8M+ monthly records on single-table DynamoDB.",
        "Processed 2M+ monthly events through the asynchronous image pipeline at 99.99% data durability.",
        "Achieved zero-downtime Blue/Green deployments across 6 production services, replacing 45 minutes of weekly maintenance windows.",
      ],
      security: [
        "Idempotency key enforcement on asynchronous event pipelines to prevent duplicate processing or replay attacks.",
        "Partition-level tenant isolation built into DynamoDB primary key structures to guarantee zero cross-tenant data leakage.",
      ],
      performance: [
        "Reduced P95 API latency from 820ms to 570ms (~30% reduction) via resolver batching and AppSync caching.",
        "Achieved sub-10ms p99 DynamoDB read latency and improved perceived cart UI responsiveness by 40%.",
      ],
      lessonsLearned: [
        "Profiling actual production execution plans is far more effective than guessing bottlenecks from code review.",
        "Optimistic UI state conflict resolution is core functionality, not optional polish — it must ship alongside the initial feature.",
      ],
      followUpQuestions: [
        "Walk me through what a sparse GSI actually buys you over a normal GSI.",
        "How did you pick TTL values for the AppSync cache without serving stale cart or pricing data?",
        "What would you do differently on the optimistic-UI rollout, in hindsight?",
      ],
    },
  },
];
