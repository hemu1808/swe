import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SkillRadar } from "@/components/SkillRadar";
import { Code2, Database, GraduationCap } from "lucide-react";
import { softSkills, toolsList } from "@/data/skills";

export function HomeBento() {
    return (
        <>
            <ScrollFadeIn>
                <section id="about" className="mt-24 md:mt-30">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                            <Code2 className="text-blue-500 w-6 h-6" /> Technical Arsenal
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">

                        {/* Main About Card */}
                        <SpotlightCard className="p-8 md:col-span-2 lg:col-span-2 lg:row-span-2 flex flex-col justify-between">
                            <div>
                                <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">About Me</h3>
                                <div className="space-y-3.5 text-sm md:text-base leading-relaxed text-zinc-700 dark:text-zinc-400">
                                    <p>
                                        I&apos;m a builder at heart—someone who loves turning real-world problems into reliable, user-friendly software & comfortable owning complex software end-to-end—from high-throughput Python and Go backend microservices to dynamic React and Next.js user interfaces.
                                    </p>
                                    <p>
                                        Currently at <strong>LeapGen AI</strong>, building enterprise RAG pipelines and multi-agent workflow orchestration using <strong>LangGraph</strong> and <strong>Model Context Protocol (MCP)</strong>. Previously at <strong>SmartRevIQ (2023–25)</strong>, engineered a revenue intelligence platform powered by schema-driven form engines and AI pricing agents.
                                    </p>
                                    <p>
                                        Architected three flagship builds—an <em>enterprise RAG knowledge base</em>, a <em>distributed Go container orchestrator</em>, and a <em>high-concurrency transit booking engine</em>.
                                    </p>
                                    <blockquote className="border-l-2 border-yellow-500 pl-3 py-1.5 text-xs md:text-sm text-zinc-600 dark:text-zinc-400 italic bg-yellow-500/[0.04] rounded-r-md">
                                        &ldquo;I like systems where correctness under concurrency actually matters. Moving deeply into AI/LLM work, I care immensely about the boring infra—observability, idempotency, crash-safety—before trusting any optimization on top of it.&rdquo;
                                    </blockquote>
                                </div>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-2">
                                <span className="text-xs text-zinc-600 dark:text-zinc-500 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent px-2 py-1 rounded font-medium">Core Focus:</span>
                                {softSkills.map(s => (
                                    <span key={s} className="text-xs text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-white/5 px-2.5 py-1 rounded">{s}</span>
                                ))}
                            </div>
                        </SpotlightCard>

                        {/* Radar Chart */}
                        <SpotlightCard className="md:col-span-1 md:row-span-2 flex flex-col items-center justify-center p-4">
                            <h4 className="text-sm font-medium text-zinc-500 mb-2">Skill Distribution</h4>
                            <SkillRadar />
                        </SpotlightCard>

                        {/* Education Card */}
                        <SpotlightCard className="flex flex-col justify-center p-8">
                            <GraduationCap className="mb-4 h-8 w-8 text-blue-500" />
                            <span className="text-lg font-normal text-zinc-900 dark:text-white leading-tight">Graduated from Auburn University at Montgomery <br /></span>
                            <span className="text-xs text-zinc-600 dark:text-zinc-500 mt-5">M.S. Computer Science (May 2025)</span>
                        </SpotlightCard>

                        {/* Tools Card */}
                        <SpotlightCard className="flex flex-col justify-center p-8">
                            <Database className="mb-4 h-8 w-8 text-purple-500" />
                            <div className="flex flex-wrap gap-2">
                                {toolsList.map(t => (
                                    <span key={t} className="text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-transparent px-2 py-1 rounded">{t}</span>
                                ))}
                            </div>
                        </SpotlightCard>

                    </div>
                </section>
            </ScrollFadeIn>
            <div className="mb-24" /> {/* Spacer */}
        </    >
    );
}
