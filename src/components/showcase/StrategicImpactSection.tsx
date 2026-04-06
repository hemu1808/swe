import React from "react";
import { Target, Activity, ShieldCheck } from "lucide-react";

export function StrategicImpactSection() {
    return (
        <div className="min-h-[150vh] w-full flex flex-col justify-center px-4 md:px-20 lg:px-40 py-20">
            <div className="max-w-4xl">
                <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-16 flex items-center gap-2">
                    <span className="w-8 h-px bg-blue-400"></span> 03. Strategic Impact
                </h2>

                <div className="space-y-24">
                    {/* HGPT Pitch */}
                    <div className="group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 transition-colors group-hover:bg-blue-500/20">
                                <Target className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">HGPT: Enterprise RAG</h3>
                        </div>
                        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed border-l-2 border-white/10 pl-6 group-hover:border-blue-500/50 transition-colors">
                            I built an Enterprise RAG system to solve the inaccuracy of standard keyword searches across massive document stores. By designing a hybrid search pipeline with ChromaDB and Cross-Encoder re-ranking, I boosted search accuracy by <strong className="text-white">50%</strong>. It asynchronously processes over <strong className="text-white">10,000 documents</strong> without blocking the UI, providing users with real-time, highly relevant answers.
                        </p>
                    </div>

                    {/* Deploy Pitch */}
                    <div className="group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 transition-colors group-hover:bg-emerald-500/20">
                                <Activity className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">Deploy: Container Engine</h3>
                        </div>
                        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed border-l-2 border-white/10 pl-6 group-hover:border-emerald-500/50 transition-colors">
                            I developed a custom container orchestration engine in Go to tackle inefficient hardware use and slow failure recovery in distributed clusters. I engineered a custom scheduler that improved hardware utilization by <strong className="text-white">25%</strong>, and a high-frequency heartbeat mechanism that cuts node failure detection down to <strong className="text-white">under 30 milliseconds</strong>. It&apos;s built for high resilience with a PostgreSQL Write-Ahead Log to guarantee crash recovery.
                        </p>
                    </div>

                    {/* Shuttle Pitch */}
                    <div className="group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 transition-colors group-hover:bg-rose-500/20">
                                <ShieldCheck className="w-6 h-6 text-rose-400" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-rose-400 transition-colors">Shuttle: Transit Reservation</h3>
                        </div>
                        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed border-l-2 border-white/10 pl-6 group-hover:border-rose-500/50 transition-colors">
                            I engineered a transit reservation system specifically to eliminate the critical issue of double-booking during heavy traffic spikes. By implementing Redis distributed locks and optimistic concurrency control, I reduced booking conflicts by <strong className="text-white">95%</strong>. It securely handles payments and scales real-time seat inventory updates to over <strong className="text-white">1,000 concurrent users</strong> with sub-50ms latency.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
