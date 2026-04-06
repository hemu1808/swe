import React from "react";

export function ArsenalSection() {
    return (
        <div className="h-screen w-full flex items-center justify-end px-4 md:px-20 lg:px-40">
            <div className="bg-zinc-950/60 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl max-w-2xl transform transition-transform hover:scale-[1.02]">
                <h2 className="text-sm font-bold tracking-widest text-emerald-500 uppercase mb-8 flex items-center justify-end gap-2">
                    02. Technical Arsenal <span className="w-8 h-px bg-emerald-500"></span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-4 border-b border-white/10 pb-2">Core Systems</h3>
                        <ul className="text-zinc-300 space-y-3 text-base font-medium">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> Go (Golang) / gRPC</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> Python / Node.js</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> PostgreSQL / Redis</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> AWS / Docker / Fargate</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-4 border-b border-white/10 pb-2">Frontend & AI</h3>
                        <ul className="text-zinc-300 space-y-3 text-base font-medium">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> React / Next.js</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> WebGL / Three.js / GSAP</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> LangChain / Llama 3</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span> Vector Databases</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
