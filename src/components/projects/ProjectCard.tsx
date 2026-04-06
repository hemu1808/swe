"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ProjectData } from "@/data/projects";
import Link from "next/link";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
    project: ProjectData;
    index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Spotlight Glow Tracking
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Spotlight Coordinates
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        // 3D Tilt Coordinates
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            style={{
                transformStyle: "preserve-3d",
                perspective: "2000px",
                rotateX,
                rotateY,
            }}
            className="relative w-full mb-6 cursor-pointer group"
        >
            <Link href={`/projects/${project.id}`} className="block relative w-full rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/80 dark:bg-zinc-950/40 p-[1px] overflow-visible backdrop-blur-xl transition-colors hover:bg-white dark:hover:bg-zinc-900/40">

                {/* Glow Hover Effects */}
                <div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                    }}
                />

                {/* Inner Card Container */}
                <div
                    className="relative z-10 w-full rounded-[23px] bg-white/90 dark:bg-zinc-950/60 p-6 md:p-8 flex flex-col gap-8 shadow-xl shadow-zinc-200/50 dark:shadow-2xl"
                    style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
                >
                    {/* Header / Title Row */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="max-w-2xl">
                            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 uppercase tracking-widest">
                                {project.title}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                                {project.description}
                            </p>
                        </div>

                        {/* Top Right Action Pills */}
                        <div className="flex items-center gap-3 shrink-0">
                            {project.gitLink && (
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    REPO <ArrowRight className="w-3 h-3" />
                                </div>
                            )}
                            {project.liveLink && (
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    LIVE <ArrowRight className="w-3 h-3" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* What it does section */}
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-600 dark:text-zinc-500 uppercase mb-3">What it does</h4>
                        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300 block">
                            {project.highlights.slice(0, 3).map((highlight, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-zinc-400 dark:text-zinc-500 mt-1">•</span>
                                    <span className="leading-relaxed">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Metadata Grid (Role, Time, Status, Focus) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        <div className="border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1">Role</span>
                            <span className="text-sm text-zinc-900 dark:text-zinc-200 font-medium">{project.role}</span>
                        </div>
                        <div className="border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1">Time</span>
                            <span className="text-sm text-zinc-900 dark:text-zinc-200 font-medium">{project.duration}</span>
                        </div>
                        <div className="border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1">Status</span>
                            <span className="text-sm text-zinc-900 dark:text-zinc-200 font-medium">{project.status}</span>
                        </div>
                        <div className="border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/30 rounded-xl p-4 flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-widest text-zinc-600 dark:text-zinc-500 font-bold mb-1">Focus</span>
                            <span className="text-sm text-zinc-900 dark:text-zinc-200 font-medium">{project.focus}</span>
                        </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200 dark:border-white/5">
                        {project.techStack.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-zinc-300 dark:border-white/10 bg-white dark:bg-transparent px-3 py-1 text-[11px] font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                </div>
            </Link>
        </motion.div>
    );
};
