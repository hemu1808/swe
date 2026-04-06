import React from "react";
import { Github, Linkedin } from "lucide-react";

export function FoundationSection() {
    return (
        <div className="h-screen w-full flex items-center justify-start px-4 md:px-20 lg:px-40">
            <div className="bg-white/60 dark:bg-zinc-950/60 p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-white/10 backdrop-blur-xl shadow-xl dark:shadow-2xl max-w-2xl transform transition-transform hover:scale-[1.02]">
                <h2 className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-blue-600 dark:bg-blue-500"></span> 01. The Foundation
                </h2>
                <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8">
                    I am a Full Stack Developer specializing in highly scalable backends, interactive frontends, and AI pipelines.
                    My obsession lies in bridging complex system design with pixel-perfect user experiences.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <a href="/resume.pdf" className="inline-block px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-sm tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        View Complete Résumé
                    </a>
                    <a href="https://github.com/hemu1808/" target="_blank" className="p-4 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/10 transition-colors">
                        <Github className="w-5 h-5 text-zinc-900 dark:text-white" />
                    </a>
                    <a href="https://www.linkedin.com/in/mangalapurapu/" target="_blank" className="p-4 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200/80 dark:hover:bg-white/10 transition-colors">
                        <Linkedin className="w-5 h-5 text-zinc-900 dark:text-white" />
                    </a>
                </div>
            </div>
        </div>
    );
}
