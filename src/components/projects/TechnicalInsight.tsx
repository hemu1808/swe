"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Layers, Trophy, Zap, ShieldCheck } from 'lucide-react';

interface InsightProps {
    insights?: {
        title: string;
        quote: string;
        levels: {
            title: string;
            description: string;
        }[];
        reflection: string;
        externalLink?: {
            label: string;
            url: string;
        };
    };
    projectColor?: string;
}

const levelIcons = [Layers, Zap, Trophy, ShieldCheck];

export function TechnicalInsight({ insights, projectColor = "blue" }: InsightProps) {
    if (!insights) return null;

    return (
        <section className="mt-24 pt-16 border-t border-zinc-200 dark:border-white/10">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" /> Engineering Insights
            </h3>

            <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] pointer-events-none" />
                
                <div className="relative z-10 max-w-4xl mx-auto">
                    <header className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                            {insights.title}
                        </h2>
                        <blockquote className="text-xl md:text-2xl font-medium text-zinc-500 dark:text-zinc-400 italic">
                            "{insights.quote}"
                        </blockquote>
                    </header>

                    <div className="grid sm:grid-cols-2 gap-4 mb-12">
                        {insights.levels.map((level, i) => {
                            const Icon = levelIcons[i] || Layers;
                            return (
                                <motion.div
                                    key={level.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 shadow-sm"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                                            <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h4 className="font-bold text-zinc-900 dark:text-white text-sm uppercase tracking-wider">
                                            {level.title}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {level.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="prose dark:prose-invert max-w-none prose-p:text-lg prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300">
                        <p>{insights.reflection}</p>
                    </div>

                    {insights.externalLink && (
                        <div className="mt-12">
                            <a 
                                href={insights.externalLink.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold transition hover:scale-105 active:scale-95 group"
                            >
                                <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                {insights.externalLink.label}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
