import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

export function HomeHero() {
    return (
        <ScrollFadeIn>
            <section className="relative flex min-h-[60vh] flex-col items-center justify-center text-center">
                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -z-10 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                    </span>
                    Available for Full-Time Opportunities
                </div>

                <h1 className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-white/90 dark:to-white/50 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl py-2">
                    Hemanth Kumar Mangalapurapu<br />
                </h1>

                <p className="mt-8 max-w-2xl text-lg text-zinc-800 dark:text-white font-medium leading-relaxed italic border-l-4 border-blue-500 pl-6 text-left mx-auto">
                    &quot;Candid, driven by impact, and ready for high-stakes engineering. Humble, practical, honest, direct, and focused on the real-world problem.&quot;
                </p>

                <p className="mt-6 max-w-7xl text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mx-auto">
                    M.S. in Computer Science at <b>Auburn University at Montgomery</b>.
                    Full-stack engineer with 2+ years of production experience, specializing in AI infrastructure, high-performance systems and data-driven product development. Experienced building real-time dashboards, and scalable backend infrastructure with a growing focus on experimentation, analytics, and growth engineering.
                </p>

                <div className="mt-12 flex gap-4 justify-center"> {/* Added justify-center for alignment */}
                    <Link href="/projects" className="group flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-3 font-semibold text-white dark:text-black transition hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xl dark:shadow-none">
                        View Work
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a href={getAssetPath("/resume.pdf")} className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-8 py-3 font-semibold text-zinc-900 dark:text-white transition hover:bg-zinc-200 dark:hover:bg-white/10 shadow-sm dark:shadow-none">
                        <FileText className="h-4 w-4" /> Resume
                    </a>
                </div>
            </section>
        </ScrollFadeIn>
    );
}
