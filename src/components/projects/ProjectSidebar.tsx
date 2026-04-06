"use client";
import React from "react";
import { projectCategories, ProjectCategory } from "@/data/projects";

interface SidebarProps {
    activeCategory: ProjectCategory;
    onSelectCategory: (category: ProjectCategory) => void;
}

export const ProjectSidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory }) => {
    return (
        <aside className="sticky top-32 w-full md:w-64 shrink-0 flex flex-col gap-2">
            <div className="mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Categories</h2>
            </div>

            <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                {projectCategories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={`relative flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-xl overflow-hidden group whitespace-nowrap ${isActive ? "text-zinc-900 bg-white dark:text-white dark:bg-white/10 shadow-sm dark:shadow-none" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
                                }`}
                        >
                            <span className="relative z-10">{category}</span>

                            {isActive && (
                                <span className="absolute inset-0 z-0 bg-blue-100/50 dark:bg-blue-500/20 border border-blue-500/10 dark:border-blue-500/30 rounded-xl" />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-white/10 hidden md:block">
                <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed">
                    Filter through my latest work focusing on <b className="text-zinc-800 dark:text-zinc-300">Distributed Systems</b>, <b className="text-zinc-800 dark:text-zinc-300">AI Integration</b>, and scalable <b className="text-zinc-800 dark:text-zinc-300">Full-Stack Development</b>.
                </p>
            </div>
        </aside>
    );
};
