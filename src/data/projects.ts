export type ProjectCategory = "All" | "Backend & Systems" | "Full Stack" | "AI & Data";

export interface ProjectData {
    id: string;
    title: string;
    category: ProjectCategory;
    duration: string;
    role: string;
    status: string;
    focus: string;
    description: string;
    highlights: string[];
    techStack: string[];
    gitLink?: string;
    liveLink?: string;
    systemDesign?: string;
    whyContent?: string;
}

export const projectsData: ProjectData[] = [
    {
        id: "enterprise-rag",
        title: "HGPT: Enterprise RAG Knowledge Base",
        category: "AI & Data",
        duration: "2025",
        role: "Full-stack AI",
        status: "Active",
        focus: "Semantic Search",
        description: "A Retrieval-Augmented Generation (RAG) system featuring real-time Server-Sent Events (SSE) streaming, Llama 3, and DSPy designed to handle 10K+ Documents.",
        highlights: [
            "Implemented a hybrid search strategy using ChromaDB, BM25 for semantic vector retrieval, and Reciprocal Rank Fusion.",
            "Cross-Encoder re-ranking to maximize context relevance, improving accuracy by 50% over standard keyword search.",
            "Enabled high-performance ingestion pipeline using FastAPI and Celery workers to asynchronously process and chunk large datasets into embedded vectors with Chain-of-Thought reasoning without blocking the UI."
        ],
        techStack: ["Python", "LangChain", "ChromaDB", "Ollama", "React", "FastAPI", "Celery"],
        gitLink: "https://github.com/hemu1808/enterprise-rag",
        liveLink: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7437262438103707649?compact=1",
        whyContent: `**Why HGPT?** Data privacy and vendor lock-in. Enterprise data cannot always be sent to OpenAI's APIs. By building a custom pipeline using local models via Ollama and ChromaDB, we guarantee zero data leakage. Furthermore, managed services charge heavily per token. A custom hybrid search strategy using local Cross-Encoder re-ranking achieves comparable 50% improved accuracy without the compounding API costs at scale.

**The Hardest Challenge:** Tuning the chunking strategy. I implemented a parent-child hierarchy, meaning we search through small chunks for millimeter precision, but retrieve the larger surrounding document context for the LLM. It took significant tuning to get the balance right, but it made the generation far more coherent.`,
        systemDesign: `
### System Architecture

The Enterprise RAG Knowledge Base is built around a decoupled architecture designed for high-throughput ingestion and low-latency retrieval.

**1. Data Ingestion Pipeline (Asynchronous)**
- **FastAPI** acts as the ingestion gateway.
- Large PDF and txt documents are pushed to a **Celery** background worker so the UI doesn't freeze.
- Celery workers parse them, chunk them using contextual splitters, and run **DSPy / Llama 3** to extract metadata and perform initial Chain-of-Thought (CoT) reasoning.

**2. Hybrid Retrieval Engine**
- During a query, both a sparse representation (BM25) and dense representation (embedding) are calculated.
- **Reciprocal Rank Fusion (RRF)** combines these disparate scoring domains to ensure we get exactly accurate results—not just 'kind of' related ones.
- A **Cross-Encoder** re-ranks the top K results to guarantee maximum semantic relevance.

**3. Observability & Caching**
- To make this production-ready, **Redis** was added to cache repeated queries, driving response times down.
- **Prometheus and Jaeger** are configured for observability, enabling exact bottleneck tracing if the inference pipeline slows.
`
    },
    {
        id: "container-orchestration",
        title: "Deploy: Distributed Container Orchestration Engine",
        category: "Backend & Systems",
        duration: "2025",
        role: "Systems Engineer",
        status: "Completed",
        focus: "Cluster Resilience",
        description: "A custom distributed control plane with a high-frequency gRPC heartbeat mechanism to manage and monitor containers.",
        highlights: [
            "Reduced node failure detection time to <30ms by engineering a custom distributed control plane in Go.",
            "Built a CLI and Dashboard utilizing Grafana to visualize real-time node metrics, exposing cluster state via RESTful API.",
            "Ensured cluster consistency and crash recovery by implementing a Write-Ahead Log (WAL) in PostgreSQL, creating a robust failover system for controller outages.",
            "Integrated Prometheus for distributed tracing and real-time observability.",
            "Improved hardware utilization by 25% by designing a custom scheduler using Bin Packing algorithm to optimize memory allocation across worker nodes."
        ],
        techStack: ["Go", "PostgreSQL", "Docker", "REST API", "Grafana", "gRPC", "Prometheus"],
        gitLink: "https://github.com/hemu1808/container-orchestration",
        liveLink: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440106367673188352?compact=1",
        whyContent: `**Why Deploy.sh?** Because Kubernetes is massive, resource-heavy, and often overkill for specialized, resource-constrained environments. I essentially challenged myself to build a mini-cloud platform from scratch. I wrote the backend in Go because I needed it to be super fast. By engineering a custom Go scheduler using a Bin Packing algorithm, I improved hardware utilization by 25% without the heavy operational overhead of managing a full Kubernetes cluster.`,
        systemDesign: `
### System Architecture

A microservices-based distributed control plane built entirely in Go, mimicking core aspects of Kubernetes to understand low-level distributed orchestration.

**1. Control Plane & gRPC Heartbeats**
- Worker nodes establish a bidirectional **gRPC stream** with the Master Node.
- The heartbeat frequency is extremely tight. If a container crashes, my system detects it and restarts it automatically within a minute.

**2. Custom Load Scaling**
- Instead of random placement, the master's scheduling algorithm evaluates current Memory and CPU availability.
- It tracks CPU usage globally and auto-provisions more nodes dynamically if load spikes above 70%.

**3. WAL & Postgres Failover**
- To prevent split-brain and ensure consistency if the Master Node crashes, all cluster state changes are appended to a **Write-Ahead Log (WAL)** stored in a master/slave **PostgreSQL** deployment.
`
    },
    {
        id: "transit-reservation",
        title: "Shuttle: High-Concurrency Transit Reservation System",
        category: "Full Stack",
        duration: "2024",
        role: "Backend Lead",
        status: "Live",
        focus: "Concurrency Control",
        description: "A scalable booking engine handling high-concurrency seat reservations across web and mobile platforms.",
        highlights: [
            "Reduced double-booking conflicts by 95% during burst traffic events by architecting a booking engine utilizing Redis Distributed Locks (Redlock) and Optimistic Concurrency Control (OCC).",
            "Secured PCI-compliant payments across React web and React Native mobile interfaces by integrating Stripe API webhooks within serverless functions for asynchronous verification.",
            "Scaled real-time inventory updates to 1,000+ concurrent clients with MongoDB versioning to manage seat inventory state.",
            "<50ms latency achieved by integrating WebSockets for bidirectional state synchronization."
        ],
        techStack: ["Node.js", "React", "React Native", "Redis", "MongoDB", "Stripe API", "AWS Amplify"],
        gitLink: "https://github.com/hemu1808/transit-reservation",
        liveLink: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440202396758237184?compact=1",
        whyContent: `**Why ShuttleNow?** ShuttleNow is a real-time ticket booking app I built using the MERN stack. The biggest technical hurdle was handling high concurrency—basically, what happens if two people try to book the exact same seat at the exact same second? To handle sudden spikes without crashing, I needed absolute control over the concurrency layer. By architecting a custom engine with Redis 'seat locking', I prevented about 95% of those double-booking conflicts.`,
        systemDesign: `
### System Architecture

Handling thousands of concurrent users trying to book the exact same transit seat requires stringent concurrency guarantees.

**1. Redis Seat Locking**
- As soon as a user selects a seat, a **Distributed Lock** is acquired in Redis. It locks it for a few minutes, temporally "holding" the inventory and preventing other active sessions from progressing past the checkout screen for the exact same seat.

**2. Stripe PCI Verification**
- For payments, I didn't want to handle sensitive data directly on my server. I integrated **Stripe** using **AWS Lambda** serverless functions to keep everything secure, asynchronous, and strictly PCI-compliant.

**3. Unified Frontend & CI/CD**
- Since users are heavily on mobile, I used a unified UI approach with **React** and **React Native** so the experience is perfectly smooth across devices.
- The entire system is bound to a full CI/CD pipeline on **AWS Amplify**, automatically building and updating the live site upon code push.
`
    },
    {
        id: "ecommerce-graphql",
        title: "E-Commerce GraphQL Architecture",
        category: "Backend & Systems",
        duration: "2021-2023",
        role: "Backend Engineer",
        status: "Production",
        focus: "GraphQL scaling",
        description: "Led redesign of backend GraphQL services for a high-traffic e-commerce platform serving 50k+ daily requests at Speeler Technologies.",
        highlights: [
            "Reduced P95 latency by 30% by implementing resolver batching and AppSync caching.",
            "Designed a multi-tenant DynamoDB Single-Table Architecture, utilizing sparse indexes and GSI sharding to eliminate hot partitions and support high-cardinality access patterns.",
            "Engineered a fault-tolerant, event-driven pipeline using Lambda and SQS Dead Letter Queues (DLQ) to process images, reducing operational infrastructure costs by 70%.",
            "Architected the frontend synchronization layer using React and WebSockets, implementing UI updates to mask network latency.",
            "Orchestrated the migration to AWS ECS Fargate, implementing Blue/Green deployments for zero-downtime releases."
        ],
        techStack: ["AWS AppSync", "GraphQL", "DynamoDB", "AWS Lambda", "S3", "React", "AWS ECS", "Cognito"],
        whyContent: `**Why GraphQL?** At Speeler Technologies, I was incredibly focused on modernizing their core e-commerce platform specifically for a printing enterprise. The main challenge was that their shopping cart needed to be radically faster to handle peak traffic. Rebuilding it with AWS AppSync and GraphQL was a huge win—it actually cut data retrieval time by about 30%.
        
**The Hardest Challenge:** The database design. I used a strict Single-Table Design in DynamoDB to keep queries lightning fast, but setting up the fine-grained access control with Cognito/IAM alongside it took extensive, careful planning to enforce exactly right.`,
        systemDesign: `
### System Architecture

This outlines the cloud-native, serverless approach taken to redesign the backend services at Speeler Technologies.

**1. AppSync & DynamoDB Single-Table Design**
- Rebuilt the monolithic shopping cart into a lightning-fast **AWS AppSync / GraphQL** schema.
- Optimized database reads executing a strict **DynamoDB Single-Table Design**, keeping latency flat even at massive scale while strictly scoping identity and access via **AWS Cognito** and IAM.

**2. Lambda Image Pipeline Automation**
- The enterprise required processing hundreds of massive printing images daily.
- I built a fully automated system: as soon as an image hits an **S3** bucket, it triggers an event-driven **AWS Lambda** function to process it instantly. Moving to this serverless architecture eliminated hours of manual work and saved the company **70% in operational costs**.

**3. Docker to Fargate**
- Packaged the entire React frontend application into Docker containers.
- Orchestrated the deployment onto **AWS ECS Fargate**, allowing the application to completely automatically scale horizontally up and down based strictly on heavy traffic spikes.
`
    },
    {
        id: "interviewprep",
        title: "InterviewPrep: Full Stack Quiz App",
        category: "Full Stack",
        duration: "2024",
        description: "A comprehensive learning platform allowing users to master core programming topics through interactive quizzes and curated study materials.",
        role: "Full Stack Engineer",
        status: "Completed",
        focus: "Education / Assessment",
        highlights: [
            "Hyper-detailed, structured learning content across 10 core programming topics (DSA, OOPS, React, etc.).",
            "Topic-wise interactive quizzes with randomized and All-in-One testing modes.",
            "Modular NestJS backend providing dedicated REST endpoints for learning content and question retrieval."
        ],
        techStack: ["React", "TypeScript", "NestJS", "Tailwind CSS", "Axios"],
        gitLink: "https://github.com/hemu1808/Quiz",
        whyContent: `**Why InterviewPrep?** This app was born from the need for a centralized, interactive platform to revise programming fundamentals for interviews. Rather than sifting through scattered resources, InterviewPrep offers a structured, user-friendly solution to prepare with confidence.`,
        systemDesign: `
### System Architecture

A classic decoupled architecture leveraging NestJS for a highly modular backend.

**1. NestJS Backend Structure**
- Built with strictly typed controllers and services, leveraging DTOs and Class-Validator for robust API validation.
- Exposes structured REST APIs for retrieving randomized quiz sets or focused, syntax-heavy learning content.

**2. React + TypeScript Frontend**
- A responsive, Glassmorphism-based UI developed using Tailwind CSS.
- Component-based architecture with React Router for seamless navigation between topic hubs and active quiz sessions.
`
    },
    {
        id: "peeppa",
        title: "Peeppa: Price Tracker Engine",
        category: "Backend & Systems",
        duration: "2024",
        description: "A cross-retailer product scraping engine that automatically tracks price drops across major outlets like Amazon, Best Buy, and Target.",
        role: "Backend Engineer",
        status: "Completed",
        focus: "Web Scraping / Data Engineering",
        highlights: [
            "Real-time and historic price tracking across automated scrapers spanning diverse e-commerce structures.",
            "Dynamic threshold-based email alerts triggering notifications when products drop below target prices.",
            "Historical pricing charts mapping price fluctuations dynamically from MongoDB."
        ],
        techStack: ["Python", "Flask", "MongoDB", "BeautifulSoup", "HTML/CSS"],
        gitLink: "https://github.com/hemu1808/Peeppa",
        whyContent: `**Why Peeppa?** To solve the fragmented shopping experience. Reconciling structured item data across highly dynamic, structurally volatile e-commerce DOMs required robust HTML parsing adapters and reliable document-based persistence.`,
        systemDesign: `
### System Architecture

A monolithic Python application focused on resilient HTML scraping and unstructured data tracking.

**1. BeautifulSoup Scraping Adapters**
- Target-specific scraping endpoints for diverse retailers (Amazon, Walmart, Best Buy) handling uniquely rendered HTML structures.
- Parses live product DOMs to extract current pricing strings and normalization.

**2. MongoDB Persistence & Email Alerts**
- Aggregates unstructured historical price snapshots into MongoDB for quick charting lookups.
- A background evaluator tests current live prices against user-defined thresholds, triggering a configured SMTP server to dispatch alerts immediately upon price tanking.
`
    },
    {
        id: "maze-game",
        title: "2D Interactive Maze Game",
        category: "Backend & Systems",
        duration: "2023",
        description: "A 2D interactive maze game built using Python and Tkinter that generates a new solvable maze every run using Depth-First Search (DFS).",
        role: "Software Developer",
        status: "Completed",
        focus: "Procedural Generation",
        highlights: [
            "Procedural maze generation using recursive backtracking (DFS).",
            "Guaranteed solvable maze from start to end with win detection and smooth frame-based updates (~60 FPS).",
            "Grid-based coordinate-to-pixel transformation supporting dynamic scaling.",
        ],
        techStack: ["Python", "Tkinter", "Algorithms", "DFS"],
        gitLink: "https://github.com/hemu1808/Maze-Game",
        whyContent: `**Why Maze Game?** To delve into procedural content generation and algorithmic thinking. Implementing a stack-based Depth-First Search (DFS) for both generation and validation ensured the maze was always solvable while teaching me grid-to-pixel mapping and frame-based event rendering.`,
        systemDesign: `
### System Architecture

A Python desktop application utilizing custom data structures for procedural generation.

**1. Maze Generation Logic**
- Uses a stack-based **Depth-First Search (DFS)** to recursively carve paths.
- Two-cell stepping ensures proper wall separation in an O(n²) time complexity graph.

**2. Game Architecture & Rendering**
- Built with **Object-Oriented Design**, separating state management from the UI canvas.
- A continuous animation loop using Tkinter's \`root.after()\` ensures a smooth ~60 FPS update cycle.
- Dynamically scales grid coordinates to Canvas pixel transformations for responsive rendering.
`
    },
    {
        id: "rawhplayer",
        title: "RawhPlayer: Desktop Media Player",
        category: "Backend & Systems",
        duration: "2023",
        description: "A lightweight desktop media player application focused on custom UI design and core playback functionality.",
        role: "Software Developer",
        status: "Completed",
        focus: "UI Design / Media Handling",
        highlights: [
            "Audio playback controls (Play / Pause / Stop) with manual file handling and media loading.",
            "Modular code structure separating event-driven UI components from core logic.",
            "Tight state management across playback transitions (idle → playing → paused)."
        ],
        techStack: ["Python", "Pygame", "GUI Design"],
        gitLink: "https://github.com/hemu1808/rawhplayer",
        whyContent: `**Why RawhPlayer?** To build a lightweight, feature-focused media player without relying on heavy frameworks. The manual control over UI components and focus on state management over multiple playback transitions demonstrated core principles in desktop application flow design.`,
        systemDesign: `
### System Architecture

A modular desktop application separating view models from multimedia handling logic.

**1. Media Handling**
- Integrates Python multimedia libraries to hook directly into the OS audio sub-system.
- Tightly controls playback state transitions to handle continuous buffer reading.

**2. Architecture & UI Implementation**
- Uses an **Event-Driven** control system where interactive widgets trigger asynchronous media commands.
- Custom component styling engineered without massive UI libraries to keep the final executable incredibly lightweight and responsive.
`
    }
];

export const projectCategories: ProjectCategory[] = [
    "All",
    "Backend & Systems",
    "Full Stack",
    "AI & Data"
];
