"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollRevealText } from "@/components/projects/ScrollRevealText";
import { ShaderBackground } from "@/components/projects/ShaderBackground";
import { ProjectSidebar } from "@/components/projects/ProjectSidebar";
import { ProjectFeed } from "@/components/projects/ProjectFeed";
import { projectsData, ProjectCategory } from "@/data/projects";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

    // Filter projects based on the active tab
    const filteredProjects = projectsData.filter(
        (project) => activeCategory === "All" || project.category === activeCategory
    );

    return (
        <div className="relative min-h-screen font-sans text-zinc-900 dark:text-zinc-50 selection:bg-blue-500/30">
            {/* Navigation */}
            <Navbar />

            {/* Interactive Shader Background */}
            <ShaderBackground category={activeCategory} />

            {/* Main Content Area */}
            <main className="mx-auto max-w-7xl px-6 pb-20 pt-24">

                {/* Header Section */}
                <header className="mb-8 md:mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-8 group bg-white/5 px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>

                    <ScrollRevealText
                        text="Highlights"
                        className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
                    >
                        A collection of engineering challenges I have tackled recently, spanning from
                        <span className="text-zinc-900 dark:text-zinc-200 font-medium"> distributed container orchestration</span> to
                        <span className="text-zinc-900 dark:text-zinc-200 font-medium"> high-concurrency booking engines</span> and
                        <span className="text-zinc-900 dark:text-zinc-200 font-medium"> enterprise RAG</span> systems.
                    </motion.p>
                </header>

                {/* Novu Inbox Layout (Sidebar + Feed) */}
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16 relative items-start">

                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 shrink-0">
                        {/* Note: The sticky behavior is defined inside ProjectSidebar */}
                        <ProjectSidebar
                            activeCategory={activeCategory}
                            onSelectCategory={setActiveCategory}
                        />
                    </div>

                    {/* Project List / Feed */}
                    <div className="flex-1 w-full min-w-0">
                        <ProjectFeed projects={filteredProjects} />
                    </div>

                </div>

            </main>
        </div>
    );
}
