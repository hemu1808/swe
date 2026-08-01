export interface ExperiencePoint {
  title: string;
  description: string;
  icon: "Zap" | "Server" | "Code2" | "Terminal" | "Rocket";
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  techStack: string[];
  points: ExperiencePoint[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "speeler-tech",
    role: "Software Developer",
    company: "Speeler Technologies",
    period: "August 2022 - July 2023",
    techStack: ["React", "GraphQL", "AWS", "Docker"],
    points: [
      {
        icon: "Zap",
        title: "Latency Reduction & GraphQL Tuning",
        description:
          "Reduced API P95 latency from 820ms to 570ms for a GraphQL service, directly improving page load time and conversion funnel drop-off for handling 50K+ daily requests, by implementing DataLoader resolver, AppSync response caching with TTL tuning, eliminating N+1 query patterns across 12 resolver chains.",
      },
      {
        icon: "Server",
        title: "DynamoDB Scaling Architecture",
        description:
          "Eliminated hot partition bottlenecks for a multi-tenant e-commerce platform with 200+ tenants and 8M+ monthly records, by designing a Single-Table DynamoDB schema with composite sort keys, sparse GSIs, and write-sharded partition keys, enabling sub-10ms reads at p99 under peak load.",
      },
      {
        icon: "Code2",
        title: "Event-Driven Cost Optimization",
        description:
          "Cut image processing infrastructure costs from $4,200/month to $1,100/month by re-architecting a synchronous processing service into an event-driven Lambda + SQS pipeline with Dead Letter Queue handling and idempotency keys, achieving 99.99% processing durability across 2M monthly events.",
      },
      {
        icon: "Terminal",
        title: "UI Concurrent React Optimizations",
        description:
          "Improved perceived UI responsiveness by 40% (measured via Lighthouse TTI regression tests) for a concurrent shopping cart feature used by 5K+ daily active sessions, by designing an optimistic update layer in React with WebSocket-driven conflict resolution and exponential backoff retry logic.",
      },
      {
        icon: "Rocket",
        title: "Zero-Downtime ECS Deployments",
        description:
          "Achieved zero-downtime deployments across 6 production services previously causing 45 minutes of weekly maintenance windows, by leading the migration from EC2 to AWS ECS Fargate with Blue/Green deployment pipelines, automated rollback triggers, and container-level health checks integrated into the CI/CD pipeline.",
      },
    ],
  },
];
