import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SkillRadar } from "@/components/SkillRadar";
import { Code2, Database, GraduationCap } from "lucide-react";

export function HomeBento() {
    return (
        <>
            <ScrollFadeIn>
                <section id="about" className="mt-24 md:mt-32">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                            <Code2 className="text-blue-500 w-6 h-6" /> Technical Arsenal
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">

                        {/* Main About Card */}
                        <SpotlightCard className="p-8 md:col-span-2 md:row-span-2 flex flex-col justify-between">
                            <div>
                                <h3 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-white">About Me</h3>
                                <p className="leading-relaxed text-zinc-700 dark:text-zinc-400">
                                    I&apos;m a builder at heart—someone who loves turning real-world problems into reliable, user-friendly software. I&apos;ve completed my M.S. in Computer Science at Auburn University at Montgomery (May 2025), and I&apos;ve spent the last few years shipping full-stack apps and ML-powered tools that scale.
                                    <br /><br />
                                    Prior to my Master&apos;s, I spent two years as a Software Engineer at Speeler Technologies, focusing on full-stack development using React and AWS. Recently, I&apos;ve been diving deep into Cloud Orchestration and building AI applications using RAG architectures to build enterprise-grade solutions.
                                </p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-2">
                                {["Soft Skills:", "Leadership", "Problem-solving", "Critical Analysis"].map(s => (
                                    <span key={s} className="text-xs text-zinc-600 dark:text-zinc-500 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent px-2 py-1 rounded">{s}</span>
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
                                {["Power BI", "SQL", "Tableau", "Excel", "Docker", "AWS", "Python", "Go", "Figma", "Git"].map(t => (
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
