import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ShaderBackground } from "@/components/projects/ShaderBackground";
import { ArrowLeft, Github, Globe, LayoutTemplate, FileQuestion, Star, Network } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { SystemDesignInteractive } from "@/components/projects/SystemDesignInteractive";
import { ArchitectureBlueprint, VideoWalkthrough } from "@/components/projects/ProjectVisuals";
import { TechnicalInsight } from "@/components/projects/TechnicalInsight";

export const generateStaticParams = async () => {
    return projectsData.map((project) => ({
        id: project.id,
    }));
};

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projectsData.find(p => p.id === id);

    if (!project) return notFound();

    const categoryColorMap: Record<string, "blue" | "purple" | "emerald" | "rose"> = {
        "AI & Data": "purple",
        "Backend & Systems": "blue",
        "Full Stack": "emerald",
    };

    const projectColor = categoryColorMap[project.category] || "blue";

    return (
        <div className="relative min-h-screen font-sans text-zinc-900 dark:text-zinc-50 selection:bg-blue-500/30">
            <Navbar />
            <ShaderBackground category={project.category} />

            <main className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:pt-32">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group bg-zinc-100 dark:bg-white/5 px-4 py-2 rounded-full border border-zinc-200 dark:border-white/10 w-max"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Feed
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8">
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <span className="text-sm font-mono text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/10">
                                {project.duration}
                            </span>
                            <span className="text-sm font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">
                                {project.category}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                            {project.title}
                        </h1>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 shrink-0 lg:mt-10">
                        {project.gitLink && (
                            <a href={project.gitLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-6 py-2.5 text-sm font-semibold text-white dark:text-black transition hover:bg-zinc-800 dark:hover:bg-zinc-200">
                                <Github className="w-4 h-4" /> Source
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-6 py-2.5 text-sm font-semibold text-zinc-900 dark:text-white transition hover:bg-zinc-200 dark:hover:bg-white/10">
                                <Globe className="w-4 h-4" /> Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {project.whyContent && (
                    <div className="mb-12 border-l-2 border-zinc-200 dark:border-white/10 pl-6 max-w-6xl">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileQuestion className="w-5 h-5 text-blue-500" /> Rationale
                        </h3>
                        <div className="prose dark:prose-invert max-w-none prose-p:text-lg prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:font-bold">
                            <ReactMarkdown>{project.whyContent}</ReactMarkdown>
                        </div>
                    </div>
                )}
                <div className="grid md:grid-cols-3 gap-12 border-t border-zinc-200 dark:border-white/10 pt-12">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            <LayoutTemplate className="w-5 h-5 text-blue-500" /> Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-12">
                            {project.techStack.map(tag => (
                                <span key={tag} className="text-sm px-3 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <ArchitectureBlueprint
                            architecture={project.architecture}
                            categoryColor={projectColor}
                        />
                    </div>

                    <div className="md:col-span-2">
                        {/* Always show highlights */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-blue-500" /> Key Highlights
                            </h3>
                            <ul className="space-y-4">
                                {project.highlights.map((h, i) => (
                                    <li key={i} className="flex gap-3 text-zinc-600 dark:text-zinc-400">
                                        <span className="text-blue-500 mt-1">▹</span>
                                        <span className="leading-relaxed">{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Show System Design if present */}
                        {project.systemDesign && (
                            <div className="prose dark:prose-invert max-w-none prose-h3:text-lg prose-h3:font-bold prose-h3:text-zinc-900 dark:prose-h3:text-white prose-h3:mb-4 prose-h3:mt-8 prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-600 dark:prose-li:text-zinc-400 prose-strong:text-zinc-900 dark:prose-strong:text-zinc-200">
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Network className="w-5 h-5 text-blue-500" /> Architecture Details</h3>
                                <div className="mt-4">
                                    <ReactMarkdown>{project.systemDesign.replace('### System Architecture', '')}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <SystemDesignInteractive projectId={project.id} />

                <div className="mt-20">
                    <VideoWalkthrough
                        videoUrl={project.videoUrl}
                        categoryColor={projectColor}
                        poster={project.architecture?.image}
                    />
                </div>

                <TechnicalInsight insights={project.insights} projectColor={projectColor} />
            </main>
        </div>
    );
}
