export interface SkillCategory {
  name: string;
  skills: string[];
  colorVariant?: "default" | "blue" | "purple";
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    colorVariant: "default",
    skills: [
      "React",
      "TypeScript/JavaScript",
      "Next.js",
      "Redux",
      "HTML",
      "Tailwind CSS",
      "ComfyUI",
      "Figma",
      "Three.js",
      "Flask",
      "BeautifulSoup",
    ],
  },
  {
    name: "Backend & Systems",
    colorVariant: "default",
    skills: [
      "Go (Golang)",
      "Python",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "gRPC",
      "WebSockets",
      "Distributed Locking",
    ],
  },
  {
    name: "Cloud & DevOps",
    colorVariant: "blue",
    skills: [
      "AWS Lambda",
      "ECS Fargate",
      "DynamoDB",
      "Docker",
      "Containerd / CRI-O",
      "Terraform",
      "CI/CD",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    name: "AI & Machine Learning",
    colorVariant: "purple",
    skills: [
      "LangChain",
      "Vector DBs (Chroma, Pinecone)",
      "Hugging Face",
      "Ollama",
      "PyTorch",
      "DSPy",
      "Llama 3",
      "BM25",
      "Cross-Encoders",
      "Reciprocal Rank Fusion",
      "RAG",
      "LLM Agents",
      "TensorFlow",
      "Matplotlib",
      "Pandas",
      "NumPy",
      "Scikit-learn",
    ],
  },
];

export const softSkills = [
  "Leadership",
  "Problem-solving",
  "Critical Analysis",
];

export const toolsList = [
  "Power BI",
  "SQL",
  "Tableau",
  "Excel",
  "Docker",
  "AWS",
  "Python",
  "Go",
  "Figma",
  "Git",
];

export const radarSkills = [
  { name: "Backend / APIs", value: 95 },
  { name: "React / Frontend", value: 90 },
  { name: "DB / Architecture", value: 85 },
  { name: "AI / RAG", value: 80 },
  { name: "Cloud / AWS", value: 85 },
];
