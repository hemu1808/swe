import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { Linkedin, Mail, Github } from "lucide-react";
import { SITE_CONFIG } from "@/lib/utils";

export function HomeContact() {
    return (
        <ScrollFadeIn>
            <section id="contact" className="mt-24 md:mt-32 max-w-2xl mx-auto mb-20 text-center">
                <div className="rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-zinc-900/30 p-8 md:p-12 backdrop-blur-md shadow-2xl">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Let&apos;s Connect</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                        I am currently seeking full-time opportunities. If you have a role that fits my skills in Full Stack Dev or Data Analysis, let&apos;s chat.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-white px-6 py-3 font-semibold text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition shadow-md dark:shadow-none">
                            <Mail className="h-4 w-4" /> {SITE_CONFIG.email}
                        </a>
                        <a href={SITE_CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-6 py-3 font-semibold text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition">
                            <Linkedin className="h-4 w-4" /> LinkedIn
                        </a>
                        <a href={SITE_CONFIG.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 px-6 py-3 font-semibold text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition">
                            <Github className="h-4 w-4" />
                            GitHub
                        </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-6 text-zinc-500 text-sm">
                        <span>+1 (669) 260 - 4469</span>
                        <span>•</span>
                        <span>New York, NY</span>
                    </div>
                </div>
            </section>
        </ScrollFadeIn>
    );
}
