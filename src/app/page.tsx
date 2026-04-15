import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeBento } from "@/components/home/HomeBento";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomeWorkflow } from "@/components/home/HomeWorkflow";
import { HomeContact } from "@/components/home/HomeContact";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden text-zinc-900 dark:text-zinc-50 selection:bg-blue-500/30">
            <Navbar />
            <ParticleBackground />

            <main id="main-content" className="mx-auto max-w-7xl px-6 pb-20 pt-32">
                <HomeHero />
                <HomeBento />
                <HomeProjects />
                <HomeWorkflow />
                <HomeContact />
            </main>

            <footer className="w-full border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 py-8 text-center transition-colors">
                <p className="text-sm text-zinc-500 dark:text-zinc-600">
                    © {new Date().getFullYear()} Hemanth Kumar Mangalapurapu. Built with Next.js & Three.js.
                </p>
            </footer>
        </div>
    );
}