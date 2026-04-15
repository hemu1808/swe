"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, X, Cpu, Video, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getAssetPath } from '@/lib/utils';

export const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-500",
        glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]"
    },
    purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        text: "text-purple-500",
        glow: "shadow-[0_0_20px_rgba(168,85,247,0.3)]"
    },
    emerald: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-500",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    },
    rose: {
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        text: "text-rose-500",
        glow: "shadow-[0_0_20px_rgba(244,63,94,0.3)]"
    }
};

interface ArchitectureBlueprintProps {
    architecture?: {
        image: string;
        description: string;
    };
    categoryColor?: string;
}

export function ArchitectureBlueprint({ architecture, categoryColor = "blue" }: ArchitectureBlueprintProps) {
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const colors = colorClasses[categoryColor] || colorClasses.blue;

    if (!architecture) return null;

    return (
        <div className="space-y-6 mt-12">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group cursor-zoom-in"
                onClick={() => setIsImageZoomed(true)}
            >
                <div className={`absolute -inset-2 rounded-2xl ${colors.bg} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
                    <Image
                        src={getAssetPath(architecture.image)}
                        alt="System Architecture"
                        width={400}
                        height={300}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </motion.div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-500" /> Core Engineering Challenge
                </h3>
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:italic prose-p:mb-4 prose-h3:text-zinc-900 dark:prose-h3:text-white prose-h3:text-sm prose-h3:font-bold prose-h3:uppercase prose-h3:mt-6 prose-h3:mb-2 prose-strong:text-zinc-900 dark:prose-strong:text-white border-l-2 border-zinc-200 dark:border-white/10 pl-4">
                    <ReactMarkdown>{architecture.description}</ReactMarkdown>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {isImageZoomed && architecture && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
                        onClick={() => setIsImageZoomed(false)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white p-2 bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsImageZoomed(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-[4/3] rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={getAssetPath(architecture.image)}
                                alt="System Architecture Full"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

interface VideoWalkthroughProps {
    videoUrl?: string;
    categoryColor?: string;
    poster?: string;
}

export function VideoWalkthrough({ videoUrl, categoryColor = "blue", poster }: VideoWalkthroughProps) {
    const colors = colorClasses[categoryColor] || colorClasses.blue;

    if (!videoUrl) return null;

    return (
        <div className="space-y-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                >
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                        <Video className="w-5 h-5 text-blue-500" /> Technical Walkthrough
                    </h3>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-900 aspect-video shadow-2xl group max-w-3xl mx-auto lg:mx-0"
            >
                <div className={`absolute inset-0 ${colors.bg} opacity-20 pointer-events-none`} />

                {videoUrl.endsWith('.mp4') ? (
                    <video
                        className="w-full h-full object-cover"
                        controls
                        poster={getAssetPath(poster)}
                    >
                        <source src={getAssetPath(videoUrl)} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <iframe
                        src={videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Project video walkthrough"
                    />
                )}
            </motion.div>
        </div>
    );
}
