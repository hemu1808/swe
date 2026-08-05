export interface SkillCategory {
  name: string;
  skills: string[];
  colorVariant?: "default" | "blue" | "purple";
}

export const skillCategories: SkillCategory[] = [
  {
    name: "AI & LLM Orchestration",
    colorVariant: "purple",
    skills: [
      "LangChain",
      "LangGraph",
      "Model Context Protocol (MCP)",
      "RAG / Hybrid Search",
      "Vector DBs (Chroma, pgvector)",
      "PyTorch",
      "Ollama / Local Inference",
      "Cross-Encoders & Reranking",
    ],
  },
  {
    name: "Backend & Systems Architecture",
    colorVariant: "default",
    skills: [
      "Python",
      "Go (Golang)",
      "FastAPI",
      "Node.js / Express",
      "GraphQL / AWS AppSync",
      "PostgreSQL",
      "DynamoDB (Single-Table)",
      "Redis / WebSockets",
    ],
  },
  {
    name: "Cloud Infrastructure & DevOps",
    colorVariant: "blue",
    skills: [
      "Docker & OCI Runtimes",
      "AWS (ECS Fargate, Lambda, SQS)",
      "Azure Cloud",
      "Terraform",
      "GitHub Actions CI/CD",
      "HashiCorp Raft Consensus",
      "Prometheus & Jaeger",
    ],
  },
  {
    name: "Frontend & Interactive UI",
    colorVariant: "default",
    skills: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Cornerstone.js (WebGL)",
    ],
  },
];

export const softSkills = [
  "RAG Architecture",
  "Agent Systems",
  "Distributed Systems",
  "High Concurrency",
  "System Observability",
];

export const toolsList = [
  "Docker",
  "AWS",
  "Azure",
  "Python",
  "Go",
  "TypeScript",
  "PostgreSQL",
  "Redis",
  "LangGraph",
  "Terraform",
];

export const radarSkills = [
  { name: "Backend / APIs", value: 95 },
  { name: "React / Frontend", value: 90 },
  { name: "DB / Architecture", value: 85 },
  { name: "AI / RAG", value: 92 },
  { name: "Cloud / AWS", value: 88 },
];
