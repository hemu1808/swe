import React from 'react';
import { Award, BrainCircuit, LineChart, Code2, MessageSquare, Calculator, Terminal, Fingerprint, Lightbulb } from 'lucide-react';
import { certificationsData } from '@/data/certifications';

const iconMap = {
    LineChart,
    BrainCircuit,
    Fingerprint,
    Code2,
    MessageSquare,
    Calculator,
    Terminal,
    Lightbulb,
    Award,
};

export function Certifications() {
    return (
        <div className="mt-16 w-full fade-in">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">Licenses & Certifications</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {certificationsData.map((c, i) => {
                    const IconComponent = iconMap[c.iconName] || Award;
                    return (
                        <div key={i} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-zinc-900/30 shadow-xl shadow-zinc-200/50 dark:shadow-none backdrop-blur hover:bg-white/80 dark:hover:bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/10 gap-4 overflow-hidden relative">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className={`p-3 rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 shadow-inner ${c.color} shrink-0`}>
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-zinc-900 dark:text-white font-bold tracking-wide leading-tight">{c.title}</h4>
                                    <div className="flex flex-col gap-1 mt-1">
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{c.organization}</p>
                                        {c.credentialId && (
                                            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono tracking-wider break-all sm:break-normal">ID: {c.credentialId}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/5 self-start sm:self-auto shrink-0 whitespace-nowrap mt-4 sm:mt-0">{c.date}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
