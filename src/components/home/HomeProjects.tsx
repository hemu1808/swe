import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function HomeProjects() {
    return (
        <ScrollFadeIn>
            <section id="projects" className="mt-24 md:mt-32">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Highlights</h2>
                    <Link href="/projects" className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-4 py-2 rounded-full transition-colors tracking-widest uppercase">
                        View All <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-1">
                    {projectsData.slice(0, 3).map((project, index) => (
                        <div key={project.id} className="w-full">
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </div>
            </section>
        </ScrollFadeIn>
    );
}
