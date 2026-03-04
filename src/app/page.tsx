import { Navbar } from "@/components/Navbar";
import { SpotlightCard } from "@/components/SpotlightCard";
import { ParticleBackground } from "@/components/ParticleBackground";
import { SkillRadar } from "@/components/SkillRadar";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { FlowChart } from "@/components/FlowChart";
import { Linkedin, Mail, ArrowRight, FileText, Database, Code2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden text-zinc-50 selection:bg-blue-500/30">
            <Navbar />
            <ParticleBackground />

            <main className="mx-auto max-w-6xl px-6 pb-20 pt-32">

                {/* HERO SECTION */}
                <ScrollFadeIn>
                    <section className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
                        {/* Glow Effect */}
                        <div className="absolute top-1/2 left-1/2 -z-10 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                            </span>
                            Available for Full-Time Opportunities
                        </div>

                        <h1 className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-8xl">
                            Hemanth Kumar<br />
                            <span className="text-4xl md:text-6xl text-white/40">Mangalapurapu</span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg text-white font-medium leading-relaxed italic border-l-4 border-blue-500 pl-6 text-left mx-auto">
                            &quot;Candid, driven by impact, and ready for high-stakes engineering. Humble, practical, honest, direct, and focused on the real-world problem.&quot;
                        </p>

                        <p className="mt-6 max-w-2xl text-lg text-zinc-400 leading-relaxed mx-auto">
                            M.S. in Computer Science at <b>Auburn University at Montgomery</b>.
                            Full Stack Engineer specializing in scalable AI infrastructure, data analysis, and cross-platform development.
                        </p>

                        <div className="mt-12 flex gap-4">
                            <Link href="/projects" className="group flex items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-zinc-200">
                                View Work
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a href="/resume.pdf" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white transition hover:bg-white/10">
                                <FileText className="h-4 w-4" /> Resume
                            </a>
                        </div>
                    </section>
                </ScrollFadeIn>

                {/* BENTO GRID - ABOUT & SKILLS */}
                <ScrollFadeIn>
                    <section id="about" className="mt-24 md:mt-32">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                                <Code2 className="text-blue-500 w-6 h-6" /> Technical Arsenal
                            </h2>
                        </div>

                        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">

                            {/* Main About Card */}
                            <SpotlightCard className="p-8 md:col-span-2 md:row-span-2 flex flex-col justify-between">
                                <div>
                                    <h3 className="mb-4 text-2xl font-bold text-white">About Me</h3>
                                    <p className="leading-relaxed text-zinc-400">
                                        I&apos;m a builder at heart—someone who loves turning real-world problems into reliable, user-friendly software. I&apos;ve completed my M.S. in Computer Science at Auburn University at Montgomery (May 2025), and I&apos;ve spent the last few years shipping full-stack apps and ML-powered tools that scale.
                                        <br /><br />
                                        Prior to my Master&apos;s, I spent two years as a Software Engineer at Speeler Technologies, focusing on full-stack development using React and AWS. Recently, I&apos;ve been diving deep into Cloud Orchestration and building AI applications using RAG architectures to build enterprise-grade solutions.
                                    </p>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {["Soft Skills:", "Leadership", "Problem-solving", "Critical Analysis"].map(s => (
                                        <span key={s} className="text-xs text-zinc-500 border border-zinc-800 px-2 py-1 rounded">{s}</span>
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
                                <span className="text-lg font-bold text-white">Auburn University Montgomery</span>
                                <span className="text-xs text-zinc-500">M.S. Computer Science (May 2025)</span>
                            </SpotlightCard>

                            {/* Tools Card */}
                            <SpotlightCard className="flex flex-col justify-center p-8">
                                <Database className="mb-4 h-8 w-8 text-purple-500" />
                                <div className="flex flex-wrap gap-2">
                                    {["Power BI", "SQL", "Tableau", "Excel"].map(t => (
                                        <span key={t} className="text-xs text-zinc-300 bg-white/5 px-2 py-1 rounded">{t}</span>
                                    ))}
                                </div>
                            </SpotlightCard>

                            {/* Flowchart Section */}
                            <div className="md:col-span-4 mt-4">
                                <SpotlightCard className="p-8">
                                    <h3 className="text-xl font-bold text-white mb-6">My Workflow</h3>
                                    <FlowChart />
                                </SpotlightCard>
                            </div>

                        </div>
                    </section>
                </ScrollFadeIn>
                <div className="mb-24" /> {/* Spacer */}

                {/* PROJECTS SECTION */}
                <ScrollFadeIn>
                    <section id="projects" className="mt-24 md:mt-32">
                        <div className="flex justify-between items-end mb-8">
                            <h2 className="text-3xl font-bold text-white">Highlights</h2>
                            <Link href="/projects" className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-4 py-2 rounded-full transition-colors tracking-widest uppercase">
                                View All <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-1">
                            {projectsData.slice(0, 2).map((project, index) => (
                                <div key={project.id} className="w-full">
                                    <ProjectCard project={project} index={index} />
                                </div>
                            ))}
                        </div>
                    </section>
                </ScrollFadeIn>

                {/* CONTACT SECTION */}
                <ScrollFadeIn>
                    <section id="contact" className="mt-24 md:mt-32 max-w-2xl mx-auto mb-20 text-center">
                        <div className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8 md:p-12 backdrop-blur-md shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s Connect</h2>
                            <p className="text-zinc-400 mb-8">
                                I am currently seeking full-time opportunities. If you have a role that fits my skills in Full Stack Dev or Data Analysis, let&apos;s chat.
                            </p>

                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <a href="mailto:hemanth.mangalapurapu@gmail.com" className="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200 transition">
                                    <Mail className="h-4 w-4" /> hemanth.mangalapurapu@gmail.com
                                </a>
                                <a href="https://www.linkedin.com/in/mangalapurapu/" target="_blank" className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition">
                                    <Linkedin className="h-4 w-4" /> LinkedIn
                                </a>
                                <a href="https://github.com/hemu1808/" target="_blank" className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                    GitHub
                                </a>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-6 text-zinc-500 text-sm">
                                <span>+1 (669) 260 - 4469</span>
                                <span>•</span>
                                <span>Chester Springs, PA</span>
                            </div>
                        </div>
                    </section>
                </ScrollFadeIn>

            </main>
        </div>
    );
}