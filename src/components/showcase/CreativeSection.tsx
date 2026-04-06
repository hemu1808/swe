import React from "react";
import { Camera, Video, Palette, ExternalLink } from "lucide-react";

export function CreativeSection() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center px-4 md:px-20 lg:px-40 py-32 max-w-[1400px] mx-auto transition-colors duration-500">
            <h2 className="text-sm font-bold tracking-widest text-rose-500 dark:text-rose-400 uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-rose-500 dark:bg-rose-400"></span> 05. Beyond Code
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-16">
                Creative Aspirations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                        My skills in <span className="text-zinc-900 dark:text-white font-semibold">video editing</span>, <span className="text-zinc-900 dark:text-white font-semibold">photography</span>, and <span className="text-zinc-900 dark:text-white font-semibold">graphic design</span> are incredibly valuable, especially as I develop my aspirations in filmmaking.
                    </p>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        I believe that engineering and art are two sides of the same coin. The meticulous attention to detail required in system architecture beautifully translates into cinematic framing, color grading, and visual storytelling.
                    </p>

                    <a href="https://hemanphoto.vercel.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-rose-400/50 dark:hover:border-rose-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all rounded-full text-zinc-900 dark:text-white font-semibold tracking-wider text-sm uppercase shadow-xl dark:shadow-2xl">
                        Check Out My Gallery
                        <ExternalLink className="w-4 h-4 text-rose-500 dark:text-rose-400 group-hover:scale-110 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-blue-300 dark:hover:border-white/10 transition-colors aspect-square mt-4 hover:bg-blue-50 dark:hover:bg-blue-500/5 group shadow-lg dark:shadow-none">
                        <Camera className="w-10 h-10 text-zinc-500 dark:text-zinc-400" />
                        <span className="text-sm font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 text-center leading-tight">Photography & Videography</span>
                    </div>
                    <div className="bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-green-300 dark:hover:border-white/10 transition-colors aspect-square mt-4 hover:bg-green-50 dark:hover:bg-green-500/5 group shadow-lg dark:shadow-none">
                        <Palette className="w-10 h-10 text-zinc-500 dark:text-zinc-400" />
                        <span className="text-sm font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 text-center leading-tight">Digital Art & Design</span>
                    </div>
                    <div className="bg-white/60 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-rose-300 dark:hover:border-white/10 transition-colors aspect-square col-span-2 mt-2 hover:bg-rose-50 dark:hover:bg-rose-500/5 group shadow-lg dark:shadow-none">
                        <Video className="w-10 h-10 text-zinc-500 dark:text-zinc-400 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors" />
                        <span className="text-sm font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors uppercase">Filmmaking</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
