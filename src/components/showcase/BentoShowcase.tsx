import React from "react";

export function BentoShowcase() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center px-4 md:px-8 py-32 max-w-[1400px] mx-auto">
            <header className="mb-12">
                <h2 className="text-sm font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-purple-600 dark:bg-purple-400"></span> 04. Engineering Highlights
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">
                    Capabilities Showcase
                </h3>
            </header>

            {/* THE RESTORED BENTO GRID */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-[1px] bg-zinc-300 dark:bg-white/10 rounded-3xl overflow-hidden border border-zinc-300 dark:border-white/10 shadow-xl dark:shadow-2xl relative">
                {/* ROW 1: TOP LEFT - Full Stack Aurora Box (1x1) */}
                <div className="bg-white/95 dark:bg-[#0c0c0c]/80 backdrop-blur-md relative p-8 flex flex-col justify-center overflow-hidden group hover:bg-zinc-50 dark:hover:bg-[#111] transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-blue-900/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100 blur-xl"></div>
                    <h3 className="text-sm font-bold tracking-widest text-zinc-700 dark:text-zinc-300 uppercase relative z-10 leading-relaxed text-center">
                        Full Stack <br /> Engineering
                    </h3>
                </div>

                {/* ROW 1: MIDDLE TOP - Cross/Isolated Box (1x1) */}
                <div className="bg-white/95 dark:bg-[#0c0c0c]/80 backdrop-blur-md p-8 flex flex-col justify-center text-center hover:bg-zinc-50 dark:hover:bg-[#111] transition-colors">
                    <h3 className="text-[11px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
                        Distributed / Microservice <br /> Architectures
                    </h3>
                </div>

                {/* ROW 1: TOP RIGHT - Enterprise RAG (2x1) */}
                <div className="bg-white/95 dark:bg-[#0c0c0c]/80 backdrop-blur-md md:col-span-2 relative overflow-hidden flex flex-col justify-end p-8 group hover:bg-zinc-50 transition-colors">
                    {/* Matrix Grid Pattern Background */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Enterprise RAG Data Pipelines</h3>
                        <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-4">Real-Time Search & Retrieval</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">Built high-throughput vector embedding microservices leveraging Llama 3 for sub-second semantic queries across 10,000+ documents.</p>
                    </div>
                </div>

                {/* ROW 2: LEFT SUNBURST (1x1) */}
                <div className="bg-white/95 dark:bg-[#0c0c0c]/80 backdrop-blur-md relative overflow-hidden flex items-center justify-center p-8 group">
                    <svg className="absolute inset-0 w-full h-full opacity-20 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="50" fill="url(#grad)" mask="url(#rays)" />
                        <mask id="rays">
                            <g stroke="white" strokeWidth="0.5">
                                {Array.from({ length: 36 }).map((_, i) => (
                                    <line key={i} x1="50" y1="50" x2={50 + 50 * Math.cos(i * 10 * Math.PI / 180)} y2={50 + 50 * Math.sin(i * 10 * Math.PI / 180)} />
                                ))}
                            </g>
                        </mask>
                    </svg>
                </div>

                {/* ROW 2: HUGE TYPOGRAPHY - Latency (2x1) */}
                <div className="bg-zinc-50/90 dark:bg-[#090909]/80 backdrop-blur-md md:col-span-2 p-8 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] group-hover:opacity-[0.05] dark:group-hover:opacity-[0.02] transition-opacity bg-black dark:bg-white" style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor), repeating-linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }} />
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2 relative z-10 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">Orchestration Latency</span>
                    <h2 className="text-7xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white relative z-10 leading-none">
                        &lt;30MS
                    </h2>
                </div>

                {/* ROW 2: RIGHT PILL (1x1) */}
                <div className="bg-white/95 dark:bg-[#0c0c0c]/80 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center hover:bg-zinc-50 dark:hover:bg-[#111] transition-colors">
                    <h3 className="text-[11px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
                        Redis Redlock <br /> Concurrency
                    </h3>
                </div>

                {/* ROW 3: HUGE TYPOGRAPHY - Uptime (2x1) */}
                <div className="bg-zinc-50/90 dark:bg-[#090909]/80 backdrop-blur-md md:col-span-2 p-8 flex flex-col justify-end relative overflow-hidden group">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-2 relative z-10 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">Target Validation Uptime</span>
                    <h2 className="text-7xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white relative z-10 leading-none mb-2">
                        99.99%
                    </h2>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-[1px] border-zinc-200 dark:border-white/20 flex items-center justify-center bg-gradient-to-tr from-blue-900/10 to-indigo-500/10 backdrop-blur-3xl transition-transform group-hover:scale-110">
                        <div className="w-24 h-24 rounded-full border-[1px] border-zinc-200 dark:border-white/20 flex items-center justify-center">
                            <span className="text-3xl font-light text-zinc-400 dark:text-zinc-500">$</span>
                        </div>
                    </div>
                </div>

                {/* ROW 3: MIDDLE BOTTOM (1x1) */}
                <div className="bg-white/95 dark:bg-[#0c0c0c]/80 backdrop-blur-md p-8 flex items-center justify-center text-center hover:bg-zinc-50 dark:hover:bg-[#111] transition-colors">
                    <h3 className="text-[11px] font-bold tracking-widest text-zinc-600 dark:text-zinc-400 uppercase">
                        AWS Fargate <br /> Executions
                    </h3>
                </div>

                {/* ROW 3: RIGHT CONCENTRIC SQUARES (1x1) */}
                <div className="bg-white/95 dark:bg-[#0c0c0c]/80 backdrop-blur-md relative overflow-hidden p-8 flex items-center justify-center group text-zinc-900 dark:text-white">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-600/10 blur-3xl rounded-full group-hover:bg-indigo-600/20 transition-colors" />

                    <svg width="100%" height="100%" viewBox="0 0 100 100" className="opacity-40 group-hover:opacity-60 transition-opacity">
                        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.5" />
                        <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <rect x="40" y="40" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="25" cy="25" r="1" fill="currentColor" />
                        <circle cx="40" cy="40" r="1" fill="currentColor" />
                        <circle cx="60" cy="60" r="1" fill="currentColor" />
                        <circle cx="75" cy="75" r="1" fill="currentColor" />
                        <circle cx="75" cy="25" r="1" fill="currentColor" />
                        <circle cx="60" cy="40" r="1" fill="currentColor" />
                        <circle cx="40" cy="60" r="1" fill="currentColor" />
                        <circle cx="25" cy="75" r="1" fill="currentColor" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
