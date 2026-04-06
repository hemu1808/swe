import React from "react";
import Link from "next/link";

export function EndJourneySection() {
    return (
        <div className="h-screen w-full flex items-center justify-center px-4 bg-gradient-to-t from-zinc-200 dark:from-zinc-950/80 to-transparent">
            <div className="text-center text-zinc-900 dark:text-white bg-white/60 dark:bg-zinc-950/40 p-12 rounded-3xl border border-zinc-200 dark:border-white/5 backdrop-blur-xl max-w-3xl transform transition-transform hover:scale-[1.02] shadow-xl dark:shadow-none">
                <h2 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-8">End of Journey</h2>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">Let&apos;s Build <br /> The Future</h3>
                <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10">
                    Ready to dig into the code or discuss full-time roles?
                </p>
                <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform text-sm shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Return Home
                </Link>
            </div>
        </div>
    );
}
