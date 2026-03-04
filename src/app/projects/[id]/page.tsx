import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ShaderBackground } from "@/components/projects/ShaderBackground";
import { ArrowLeft, Github, Globe, LayoutTemplate, Lightbulb } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

export const generateStaticParams = async () => {
    return projectsData.map((project) => ({
        id: project.id,
    }));
};

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projectsData.find(p => p.id === id);

    if (!project) return notFound();

    return (
        <div className="relative min-h-screen font-sans text-zinc-50 selection:bg-blue-500/30">
            <Navbar />
            <ShaderBackground category={project.category} />

            <main className="mx-auto max-w-4xl px-6 pb-32 pt-32 lg:pt-40">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-12 group bg-white/5 px-4 py-2 rounded-full border border-white/10"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Feed
                </Link>

                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="text-sm font-mono text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                            {project.duration}
                        </span>
                        <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                            {project.category}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 mb-16">
                    {project.gitLink && (
                        <a href={project.gitLink} target="_blank" className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200">
                            <Github className="w-4 h-4" /> View Source
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                            <Globe className="w-4 h-4" /> Live Demo
                        </a>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <LayoutTemplate className="w-5 h-5 text-blue-500" /> Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tag => (
                                <span key={tag} className="text-sm px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        {/* THE "WHY" SECTION */}
                        {project.whyContent && (
                            <div className="mb-12 bg-blue-500/5 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" /> The Rationale
                                </h3>
                                <div className="prose prose-invert max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-bold prose-strong:tracking-tight">
                                    <ReactMarkdown>{project.whyContent}</ReactMarkdown>
                                </div>
                            </div>
                        )}

                        <div className="prose prose-invert max-w-none prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-zinc-200">
                            {project.systemDesign ? (
                                <ReactMarkdown>{project.systemDesign}</ReactMarkdown>
                            ) : (
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Highlights</h3>
                                    <ul className="space-y-4">
                                        {project.highlights.map((h, i) => (
                                            <li key={i} className="flex gap-3 text-zinc-400">
                                                <span className="text-blue-500">▹</span>
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
