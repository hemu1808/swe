import React from 'react';
import { Award, BrainCircuit, LineChart, Code2, MessageSquare, Calculator, Terminal, Fingerprint, Lightbulb } from 'lucide-react';

const certs = [
    {
        title: "Data Analytics",
        organization: "Cisco",
        date: "Jul 2024",
        Icon: LineChart,
        color: "text-blue-500"
    },
    {
        title: "Tweet Emotion Recognition with TensorFlow",
        organization: "Coursera Project Network",
        date: "Jun 2024",
        Icon: BrainCircuit,
        color: "text-purple-500",
        credentialId: "PHSXVRV6LDSZ"
    },
    {
        title: "Facial Expression Recognition with PyTorch",
        organization: "Coursera Project Network",
        date: "Jun 2024",
        Icon: Fingerprint,
        color: "text-orange-500",
        credentialId: "XSNRHCHF8646"
    },
    {
        title: "Intro to Basic Game Development using Scratch",
        organization: "Coursera Project Network",
        date: "Jun 2024",
        Icon: Code2,
        color: "text-green-500",
        credentialId: "8S2U8XT26M3C"
    },
    {
        title: "Create a Lead Generation Messenger Chatbot using Chatfuel",
        organization: "Coursera Project Network",
        date: "Jun 2024",
        Icon: MessageSquare,
        color: "text-blue-400",
        credentialId: "R6NUNYC4W9NQ"
    },
    {
        title: "Data Science Math Skills",
        organization: "Duke University",
        date: "Jul 2024",
        Icon: Calculator,
        color: "text-indigo-500",
        credentialId: "5WRMJTP89FZT"
    },
    {
        title: "Programming for Everybody (Getting Started with Python)",
        organization: "University of Michigan",
        date: "Sep 2020",
        Icon: Terminal,
        color: "text-yellow-600",
        credentialId: "NT2WACYV7XSR"
    },
    {
        title: "Python 101 for Data Science",
        organization: "Cognitive Class",
        date: "Aug 2024",
        Icon: Code2,
        color: "text-yellow-500",
        credentialId: "17969e36998e4812b78c53925a91452e"
    },
    {
        title: "The Art of Prompt Engineering",
        organization: "Cognitive Class",
        date: "Aug 2024",
        Icon: Lightbulb,
        color: "text-emerald-500",
        credentialId: "bc0778173bad4c67814bc8fe0bea51e8"
    },
    {
        title: "Create Your Own ChatGPT-like Website with LLMs",
        organization: "Cognitive Class",
        date: "Aug 2024",
        Icon: Award,
        color: "text-pink-500",
        credentialId: "f333c5a1c1564694891db54ee58ada60"
    },
    {
        title: "Automate the Boring Stuff With LLMs",
        organization: "Cognitive Class",
        date: "Aug 2024",
        Icon: BrainCircuit,
        color: "text-rose-500",
        credentialId: "338cfd854d854f148c6f6fcfd38a0a95"
    }
];

export function Certifications() {
    return (
        <div className="mt-16 w-full fade-in">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">Licenses & Certifications</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {certs.map((c, i) => (
                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/30 shadow-lg shadow-zinc-200/50 dark:shadow-none backdrop-blur hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-white/10 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 shadow-inner ${c.color} shrink-0`}>
                                <c.Icon className="w-6 h-6" />
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
                ))}
            </div>
        </div>
    );
}
