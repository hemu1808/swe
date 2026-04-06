import React from 'react';
import { Award, ShieldCheck, Cloud } from 'lucide-react';

const certs = [
    {
        title: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        date: "2024",
        Icon: Cloud,
        color: "text-orange-500"
    },
    {
        title: "Certified Kubernetes Administrator (CKA)",
        organization: "Cloud Native Computing Foundation",
        date: "2024",
        Icon: ShieldCheck,
        color: "text-blue-500"
    },
    {
        title: "Machine Learning Engineering Pro",
        organization: "DeepLearning.AI",
        date: "2023",
        Icon: Award,
        color: "text-purple-500"
    }
];

export function Certifications() {
    return (
        <div className="mt-16 w-full fade-in">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">Certifications & Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certs.map((c, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/30 shadow-lg shadow-zinc-200/50 dark:shadow-none backdrop-blur hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/10 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 shadow-inner ${c.color}`}>
                                <c.Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-zinc-900 dark:text-white font-bold tracking-wide">{c.title}</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-medium">{c.organization}</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-500 bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/5 self-start sm:self-auto shrink-0">{c.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
