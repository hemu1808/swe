"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { gsap } from "gsap";
import { FlowChart } from "@/components/FlowChart";
import { SkillRadar } from "@/components/SkillRadar";
import { ParticleWavesBackground } from "@/components/skills/ParticleWaves";
import { Certifications } from "@/components/skills/Certifications";
import { InsightsMedia } from "@/components/skills/InsightsMedia";

export default function SkillsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<SVGRectElement>(null);
    const [filterPos, setFilterPos] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset slightly so the prism follows strictly under cursor
            setFilterPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen text-zinc-900 dark:text-zinc-50 font-sans overflow-x-hidden selection:bg-blue-500/30" ref={containerRef}>
            <Navbar />

            {/* 3D Wave Background */}
            <ParticleWavesBackground />

            {/* GSAP Prism SVG Filter Definition */}
            <svg className="hidden">
                <defs>
                    <filter id="prism-spotlight" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                        <feColorMatrix type="matrix" in="displaced" result="colorized"
                            values="
                1.3 0   0   0   0
                0   0.5 0   0   0
                0   0   2.0 0   0
                0   0   0   1   0"
                        />
                        <feMerge>
                            <feMergeNode in="SourceGraphic" />
                            <feMergeNode in="colorized" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Mouse Follower generating the SVG filter distortion field */}
            <div
                className="pointer-events-none fixed inset-0 z-10 opacity-70 mix-blend-screen transition-opacity duration-300"
                style={{
                    background: `radial-gradient(400px circle at ${filterPos.x}px ${filterPos.y}px, rgba(59, 130, 246, 0.4), transparent 40%)`,
                    filter: 'url(#prism-spotlight)'
                }}
            />

            <main className="mx-auto max-w-6xl px-6 pb-20 pt-24 relative z-20">
                <header className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
                        Skills & Technologies
                    </h1>
                    <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Core engineering capabilities.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">

                    <div className="space-y-8 relative group p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 shadow-xl shadow-zinc-200/50 dark:shadow-none backdrop-blur">
                        <div>
                            <h3 className="text-sm tracking-widest uppercase font-bold text-zinc-600 dark:text-zinc-500 mb-3 border-b border-zinc-200 dark:border-white/10 pb-2">Backend & Systems</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {["Go (Golang)", "Python", "Node.js", "PostgreSQL", "MongoDB", "Redis", "gRPC", "WebSockets", "HashiCorp Raft", "Distributed Locking"].map(s => (
                                    <span key={s} className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition-colors text-xs font-medium">{s}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm tracking-widest uppercase font-bold text-zinc-600 dark:text-zinc-500 mb-3 border-b border-zinc-200 dark:border-white/10 pb-2">Cloud & DevOps</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {["AWS Lambda", "ECS Fargate", "DynamoDB", "Docker", "Containerd / CRI-O", "Terraform", "CI/CD", "Prometheus", "Grafana"].map(s => (
                                    <span key={s} className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-500/20 shadow-sm dark:shadow-none transition-colors text-xs font-medium">{s}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm tracking-widest uppercase font-bold text-zinc-600 dark:text-zinc-500 mb-3 border-b border-zinc-200 dark:border-white/10 pb-2">AI & Machine Learning</h3>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {["LangChain", "Vector DBs (Chroma)", "Ollama", "PyTorch", "DSPy", "Llama 3", "BM25", "Cross-Encoders", "RRF"].map(s => (
                                    <span key={s} className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 shadow-sm dark:shadow-none transition-colors text-xs font-medium">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-zinc-900/30 shadow-xl shadow-zinc-200/50 dark:shadow-none backdrop-blur min-h-[350px] flex flex-col justify-center items-center">
                            <h3 className="text-sm tracking-widest uppercase font-bold text-zinc-600 dark:text-zinc-500 mb-6 self-start">Skill Distribution</h3>
                            <SkillRadar />
                        </div>
                    </div>

                </div>

                <div className="mt-12 p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-zinc-900/30 shadow-xl shadow-zinc-200/50 dark:shadow-none backdrop-blur w-full">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8">Engineering Workflow</h3>
                    <FlowChart />
                </div>

                <Certifications />
                <InsightsMedia />

            </main>
        </div>
    );
}
