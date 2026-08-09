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
    coverImage?: string;
    highlights: string[];
    techStack: string[];
    gitLink?: string;
    liveLink?: string;
    systemDesign?: string;
    whyContent?: string;
    architecture?: {
        image: string;
        description: string;
    };
    videoUrl?: string;
    insights?: {
        title: string;
        quote: string;
        levels: {
            title: string;
            description: string;
        }[];
        reflection: string;
        externalLink?: {
            label: string;
            url: string;
        };
    };
}

export const projectsData: ProjectData[] = [
    {
        id: "enterprise-rag",
        title: "HemGPT: Enterprise RAG System",
        category: "AI & Data",
        duration: "2025",
        role: "Full-Stack AI",
        status: "Active",
        focus: "Semantic & Lexical Hybrid RAG",
        coverImage: "/hgpt_cover.png",
        description: "A production-grade RAG platform enabling secure multi-document reasoning over 10,000+ internal documents via hybrid vector search, Reciprocal Rank Fusion, and local Ollama inference.",
        highlights: [
            "Engineered a hybrid retrieval engine pairing ChromaDB vector embeddings with BM25 keyword search, fused via Reciprocal Rank Fusion.",
            "Implemented cross-encoder reranking and context compression to eliminate low-relevance passages before LLM context injection.",
            "Integrated local Ollama inference for query expansion and token streaming with zero external API data leakage.",
            "Built async background ingestion via FastAPI and Celery workers, guarded by Redis rate limiters, caching, and circuit breakers.",
            "Configured full observability with Prometheus metrics, Grafana dashboards, Jaeger distributed tracing, and Kubernetes HPA auto-scaling."
        ],
        techStack: ["Python", "FastAPI", "LangChain", "ChromaDB", "BM25", "Ollama", "Cross-Encoder", "Celery", "Redis", "Prometheus", "Jaeger", "Docker"],
        gitLink: "https://github.com/hemu1808/H_ollama_gpt",
        liveLink: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7437262438103707649?compact=1",
        whyContent: `**Why HemGPT?** Enterprise data privacy and vendor cost management. Sending sensitive internal documents to third-party LLM APIs risks compliance violations and compounding per-token costs at scale. By deploying local models via Ollama alongside ChromaDB and BM25, we achieve zero data leakage while maintaining high precision.

**The Hardest Challenge:** Context window budgeting and chunking drift. I implemented a parent-child chunking hierarchy and sentence-level context compression. The retriever searches fine-grained child chunks for pinpoint accuracy, but inflates the surrounding parent context for the LLM generator.`,
        systemDesign: `
### System Architecture

The HemGPT RAG System decouples ingestion, hybrid retrieval, and generation to handle heavy concurrent query loads reliably.

**1. Data Ingestion & Async Processing**
- **FastAPI** handles file validation and queues ingestion jobs to **Celery** workers with Redis backends.
- Workers perform semantic chunking, parent-child splitting, and async vector index generation without blocking the web thread.

**2. Hybrid Retrieval & RRF Fusion**
- Queries undergo **Query Expansion** via Ollama to generate parallel search variations.
- Search queries execute concurrently against **ChromaDB** (dense semantic vector search) and **BM25/Elasticsearch** (sparse lexical search).
- **Reciprocal Rank Fusion (RRF)** merges candidate lists, followed by a **Cross-Encoder Reranker** that scores exact passage relevance.

**3. Fault Tolerance & Observability**
- **Redis** provides response caching, token-bucket rate limiting, and circuit breakers around inference calls.
- **Prometheus and Jaeger** capture query-level latency histograms and distributed traces across vector lookup and model generation steps.
`,
        architecture: {
            image: "/hgptpn.jpg",
            description: "The Bottleneck: Pure vector search (ChromaDB) missed exact keyword queries, while keyword search (BM25) missed semantic intent.\n\n### The Solution\nImplemented a parallel hybrid retrieval pipeline executing dense and sparse queries simultaneously, fusing candidate scores with Reciprocal Rank Fusion (RRF) and filtering via Cross-Encoder reranking.\n\n### The Trade-off\nReranking introduces a ~150ms latency overhead, but boosts context precision by over 50%, ensuring higher accuracy before prompt delivery."
        },
        videoUrl: "/hgptvideo.mp4",
        insights: {
            title: "The Reality of Production RAG",
            quote: "An LLM-as-a-judge that agrees with itself is not an eval.",
            levels: [
                {
                    title: "Level 1: Prompt Wrapper",
                    description: "Direct API calls without context grounding or local memory."
                },
                {
                    title: "Level 2: Basic Vector Search",
                    description: "Naive vector retrieval stuck with single-embedding recall gaps."
                },
                {
                    title: "Level 3: Hybrid Retrieval & Reranking",
                    description: "BM25 + Dense vector search fused with cross-encoder precision."
                },
                {
                    title: "Level 4: Observability & Resilience",
                    description: "Circuit breakers, tracing, async ingestion, and containerized scale."
                }
            ],
            reflection: "Moving from basic RAG to a production system requires rigorous infrastructure. Implementing hybrid retrieval (BM25 + Vector), Reciprocal Rank Fusion, cross-encoder reranking, and Jaeger tracing proved that query accuracy is an architectural problem, not just a prompt engineering exercise.",
            externalLink: {
                label: "Read the full breakdown on TurboQuant",
                url: "https://lnkd.in/e8yb9nsZ"
            }
        }
    },
    {
        id: "container-orchestration",
        title: "AuraDeploy: Distributed Container Orchestration Engine",
        category: "Backend & Systems",
        duration: "2025",
        role: "Systems & Infrastructure",
        status: "Completed",
        focus: "Distributed Consensus & Runtime",
        coverImage: "/deploysh_cover.png",
        description: "A high-availability container orchestration engine written natively in Go, leveraging embedded Raft consensus, custom CNI networking, and CRI-O/containerd OCI runtimes.",
        highlights: [
            "Architected an Active-Passive high-availability control plane in Go using embedded HashiCorp Raft for distributed consensus, log replication, and FSM snapshots with zero external DB dependency.",
            "Integrated native CRI-O / containerd runtime interfaces (`containerd/oci`) for staging OCI images, configuring cgroup limits, and managing network namespaces via `netlink`.",
            "Designed a custom scheduling loop with predicate filtering (`HasSufficientResources`, `VolumeNodeAffinity`) and `LeastAllocated` priority scoring for optimal cluster workload placement.",
            "Engineered a multi-host custom CNI overlay featuring VXLAN mesh networking, deterministic `/24` IPAM subnets, and an integrated dummy UDP DNS server for service discovery.",
            "Built a custom CSI local volume provisioner with 1:1 PVC host-path binding, JWT + RBAC authentication, admission-control webhooks, and a declarative GitOps drift reconciler."
        ],
        techStack: ["Go", "HashiCorp Raft", "containerd / CRI-O", "Custom CNI (VXLAN)", "Custom CSI", "GitOps", "JWT / RBAC", "Prometheus", "OpenTelemetry", "React"],
        gitLink: "https://github.com/hemu1808/Deploysh",
        liveLink: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440106367673188352?compact=1",
        whyContent: `**Why AuraDeploy?** Full Kubernetes stacks carry heavy operational overhead and memory footprints that are overkill for resource-constrained or edge environments. I challenged myself to engineer a single-binary control plane in Go that guarantees state consistency and self-healing.

**The Hardest Challenge:** Multi-host container networking without external plugins. I wrote a custom CNI that uses Linux \`netlink\` to create veth pairs, attaches them to a host bridge (\`aura0\`), and encapsulates traffic across nodes via a VXLAN overlay interface (\`vxlan0\`).`,
        systemDesign: `
### System Architecture

AuraDeploy is structured as a decoupled distributed control plane and container execution agent written entirely in Go.

**1. Control Plane & Consensus (Subsystem A)**
- Embedded **HashiCorp Raft** manages state machine replication, leader election, and log snapshots.
- An HTTP API server protected by **JWT authentication** and **RBAC admission control** redirects state mutations to the active Raft leader.
- A **GitOps reconciler** periodically diffs remote Git manifest specs against current cluster state to heal drift.

**2. Execution & Data Plane (Subsystem B)**
- **Custom Scheduler:** Runs a goroutine loop evaluating predicates and \`LeastAllocated\` priorities to bind pending pods to worker nodes.
- **CRI-O / containerd Client:** Downloads OCI image layers, applies cgroup memory/CPU limits, and spawns container runtimes.
- **Custom CNI & CSI:** Provisions VXLAN network interfaces, handles deterministic IPAM allocations, and binds local storage paths to PVC mounts.
`,
        architecture: {
            image: "/deploypn.png",
            description: "The Bottleneck: High-frequency cluster status updates to the React dashboard could easily trigger heavy DOM re-renders and UI freezing.\n\n### The Backend Architecture\nGo goroutines continuously poll Raft state and system metrics, broadcasting snapshot diffs over a high-throughput WebSocket hub.\n\n### The Frontend Solution\nDirectly intercepted WebSocket payloads into the React Query cache, bypassing traditional React state hooks to achieve polling-free, 60fps dashboard updates."
        },
        videoUrl: "/deployvideo.mp4"
    },
    {
        id: "sunx-radiography",
        title: "SunX: AI Radiography & Clinical Decision Support",
        category: "AI & Data",
        duration: "2025",
        role: "AI Systems",
        status: "Active",
        focus: "Medical Imaging & Clinical RAG",
        coverImage: "/sunx_cover.png",
        description: "An AI radiography platform integrating a DenseNet-121 vision model for chest X-ray pathology detection with a pgvector RAG engine to surface evidence-based clinical treatment guidelines.",
        highlights: [
            "Built a DICOM image processing and HIPAA-aware PHI anonymization pipeline using `pydicom` and `MONAI` for automated medical image ETL.",
            "Deployed a fine-tuned DenseNet-121 PyTorch vision model on NVIDIA Triton Inference Server to classify 14 pathology classes (Pneumonia, Cardiomegaly, Effusion, etc.).",
            "Engineered a clinical RAG pipeline using LangChain and `pgvector` over 1536-dimensional embeddings, retrieving treatment recommendations grounded in AHA/ACC and IDSA medical guidelines.",
            "Integrated Cornerstone.js WebGL DICOM viewer into a Next.js dashboard for zero-latency client-side pan, zoom, and window-level manipulation.",
            "Orchestrated async inference tasks with Celery and Redis, fully containerized via Docker Compose with Nginx reverse proxying."
        ],
        techStack: ["PyTorch", "DenseNet-121", "MONAI", "FastAPI", "Next.js", "PostgreSQL", "pgvector", "LangChain", "Cornerstone.js", "NVIDIA Triton", "Celery", "Docker"],
        gitLink: "https://github.com/hemu1808/SunX",
        whyContent: `**Why SunX?** Most medical AI tools stop at pathology classification, leaving clinicians with raw probability numbers. SunX bridges visual AI and clinical action by retrieving evidence-based treatment plans directly from peer-reviewed clinical guidelines (IDSA/ATS, AHA).

**The Clinical Guardrails:** SunX uses RAG over verified medical literature rather than relying on LLM parametric memory, ensuring all treatment suggestions include traceable source citations for physician review.`,
        systemDesign: `
### System Architecture

\`\`\`mermaid
flowchart LR
    A[DICOM Upload] --> B[Anonymize + ETL\npydicom / MONAI]
    B --> C[DenseNet-121\nTriton Inference Server]
    C --> D[Pathology Scores\n+ Findings]
    D --> E[LangChain RAG Engine]
    E --> F[(pgvector\nClinical Guidelines)]
    E --> G[Evidence-Based\nTreatment Plan]
    C --> H[Cornerstone.js\nDICOM Viewer]
    H --> I[Next.js Dashboard]
    G --> I
\`\`\`

SunX combines high-throughput vision model inference with vector-based medical retrieval.

**1. Visual Inference Pipeline**
- Incoming DICOM files are anonymized and preprocessed via **MONAI**.
- Tensors are dispatched to **NVIDIA Triton Inference Server**, running **DenseNet-121** to output 14 multi-label pathology probability scores and bounding boxes.

**2. Clinical Decision Support (RAG)**
- Detected findings trigger a **LangChain** workflow that queries **PostgreSQL + pgvector**.
- The RAG engine retrieves matching clinical practice guidelines (IDSA/ATS) and formats a structured treatment recommendation.

**3. WebGL Imaging Interface**
- The **Next.js** frontend embeds **Cornerstone.js**, rendering DICOM pixel arrays directly on the GPU via WebGL for instantaneous window-leveling and annotation.
`,
        architecture: {
            image: "/sunx_cover.png",
            description: "The Clinical Challenge: Raw pathology detection scores leave physicians to look up treatment protocols manually.\n\n### The Solution\nIntegrated DenseNet-121 visual findings with a pgvector LangChain RAG engine, surfacing AHA/ACC & IDSA guideline-backed treatment recommendations with source citations."
        }
    },
    {
        id: "transit-reservation",
        title: "ShuttleNow: Real-Time Shuttle Booking Platform",
        category: "Full Stack",
        duration: "2024",
        role: "Full-Stack Backend Lead",
        status: "Live",
        focus: "Concurrency & WebSockets",
        coverImage: "/shuttle_cover.png",
        description: "A real-time transit reservation engine featuring Socket.IO seat soft-locking, live Google Maps route tracking, Stripe payments, and digital QR tickets.",
        highlights: [
            "Eliminated double-booking race conditions by 95% using Socket.IO in-memory soft-locks that instantly reserve selected seats across all connected clients before database writes occur.",
            "Integrated Google Maps Directions API for live route drawing and Google Places Autocomplete for dynamic admin location entry.",
            "Architected secure payment verification using Stripe API webhooks and serverless functions for PCI-compliant transaction processing.",
            "Generated scannable digital QR-code tickets upon booking confirmation, saved to user profiles and instant verification endpoints.",
            "Implemented dual JWT authentication portals for riders and admins, supporting guest checkout flows with zero friction."
        ],
        techStack: ["Node.js", "Express.js", "React", "MongoDB", "Socket.IO", "Stripe API", "Google Maps API", "QR Code", "Tailwind CSS"],
        gitLink: "https://github.com/hemu1808/ShuttleNow",
        liveLink: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440202396758237184?compact=1",
        whyContent: `**Why ShuttleNow?** Traditional transit reservation sites rely on static HTTP requests, causing race conditions when multiple users attempt to book the last available seat simultaneously. ShuttleNow uses WebSockets to lock seats in real-time as soon as a user clicks.

**The Hardest Challenge:** Balancing transient soft-lock state with permanent DB state. I separated real-time seat holds into a Redis/Socket.IO memory layer, committing to MongoDB only after Stripe payment verification succeeded.`,
        systemDesign: `
### System Architecture

Designed to provide sub-50ms seat state synchronization across concurrent mobile and web clients.

**1. Real-Time Seat Soft-Locking**
- User seat selection triggers a **Socket.IO event** that sets an in-memory lock with a TTL countdown.
- All connected clients receive an instant UI update marking the seat as unavailable.

**2. Payment & Ticketing Pipeline**
- Checkout dispatches a **Stripe PaymentIntent**. Upon payment webhook confirmation, MongoDB updates seat state from soft-locked to confirmed.
- A **QR Code payload** is generated and bound to the booking record for ticket scanning.

**3. Live Route & Fleet Tracking**
- Admin location updates stream simulated GPS coordinates over WebSockets, drawing live marker movements on Google Maps for waiting riders.
`,
        architecture: {
            image: "/shpn.png",
            description: "The Bottleneck: Hitting MongoDB for transient seat clicks caused severe database latency and race conditions.\n\n### The Solution\nDecoupled transient state. A Socket.IO server broadcasts soft-locks instantly across active sockets, reserving MongoDB strictly for finalized Stripe payment checkouts."
        },
        videoUrl: "/shuttlevideo.mp4"
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
        gitLink: "https://github.com/hemu1808/Front-End-Project-University",
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
    },
    {
        id: "facial-expression-recognition",
        title: "Facial Expression Recognition with PyTorch",
        category: "AI & Data",
        duration: "Jun 2024 – Jun 2024",
        description: "A machine learning project designed to accurately classify human facial expressions from images using a trained PyTorch model.",
        role: "Machine Learning Engineer",
        status: "Completed",
        focus: "Computer Vision / Deep Learning",
        highlights: [
            "Preprocessing of facial images for robust feature extraction.",
            "Training a convolutional neural network (CNN) for precise expression recognition.",
            "Achieving high accuracy in classifying diverse expressions such as happiness, sadness, anger, and surprise."
        ],
        techStack: ["PyTorch", "Python", "Deep Learning", "CNN"],
        whyContent: `**Why Facial Expression Recognition?** Associated with Auburn University at Montgomery, this project was an exciting deep dive into machine learning to classify human emotions from raw pixels. It highlights my proficiency in machine learning, deep learning, and computer vision architectures.`,
        systemDesign: `
### System Architecture

**1. Data Preprocessing**
- Cleaning and manipulating facial images to ensure proper alignment and normalize data distributions.

**2. Deep Learning Modeling**
- Built entirely within **PyTorch**, implementing a deep **Convolutional Neural Network (CNN)**.
- Multiple layers engineered to capture nuanced edge and texture features defining distinct human expressions mathematically.
`
    },
    {
        id: "image-classifier-tensorflow",
        title: "Image Classifier using Tensorflow",
        category: "AI & Data",
        duration: "Jun 2024 – Jun 2024",
        description: "A comprehensive deep learning model building experience producing high validation accuracy by classifying images into organized folders.",
        role: "Machine Learning Engineer",
        status: "Completed",
        focus: "Image Classification",
        highlights: [
            "Enhanced the dataset with robust data augmentation techniques to drastically improve model accuracy and robustness.",
            "Built and trained a convolutional neural network (CNN) with optimized layers and dropout regularization.",
            "Developed an automated pipeline to actively classify images and dynamically move them into respective category folders based on predictions.",
            "Achieved high validation accuracy, ensuring reliable model performance on unseen test data."
        ],
        techStack: ["TensorFlow", "Keras", "Python", "Google Colab", "CNN"],
        gitLink: "https://github.com/hemu1808/Random-files.git",
        whyContent: `**What I Learned:**
- The critical importance of balanced and well-preprocessed datasets.
- Advanced techniques in CNN architecture design and hyperparameter tuning.
- Practical implementation of machine learning models for real-world applications.

I loved learning new things natively manipulating models using Google Colab, Keras, and TensorFlow. Tracking epochs and tuning hyperparameters in loops was a challenging yet highly rewarding experience!`,
        systemDesign: `
### System Architecture

**1. Data Preprocessing & Augmentation**
- Applying varied transformations explicitly to expand the dataset variation preventing overfitting and improving real-world generalization.

**2. CNN Model Architecture & Automation**
- Built on **TensorFlow** & **Keras**, introducing Dropouts selectively to penalize excessive weight correlations yielding excellent validation accuracy.
- Enforced an automated OS-level script sorting output files directly matching prediction classes into local directories.
`
    }
];

export const projectCategories: ProjectCategory[] = [
    "All",
    "Backend & Systems",
    "Full Stack",
    "AI & Data"
];
