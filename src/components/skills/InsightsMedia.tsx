import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';

export function InsightsMedia() {
    return (
        <div className="mt-16 w-full fade-in">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 border-b border-zinc-200 dark:border-white/10 pb-4">Insights & Media</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Column A: LinkedIn Video Embed */}
                <div className="w-full h-full rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/30 shadow-xl shadow-zinc-200/50 dark:shadow-none backdrop-blur p-2 md:p-6 flex flex-col items-center justify-center">
                    <div className="w-full max-w-[504px] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 shadow-inner">
                        <iframe 
                            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440202396758237184?collapsed=1" 
                            className="w-full aspect-[4/5] sm:aspect-square md:h-[542px]"
                            frameBorder="0" 
                            allowFullScreen 
                            title="LinkedIn Project Showcase">
                        </iframe>
                    </div>
                </div>

                {/* Column B: Medium Articles */}
                <div className="flex flex-col gap-4 h-full">
                    {/* Article 1 */}
                    <a href="https://medium.com/@hemu1808/the-end-of-the-memory-tax-how-googles-turboquant-is-rewriting-the-rules-of-local-rag-systems-633082cd701e" target="_blank" rel="noopener noreferrer" className="group p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/30 shadow-lg shadow-zinc-200/50 dark:shadow-none backdrop-blur hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-white/10 transition-all flex flex-col justify-between h-full min-h-[240px]">
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className="px-3 py-1 bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white text-xs font-bold rounded-full border border-zinc-200 dark:border-white/10 flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" /> Medium Article
                                </span>
                                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h4 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-100 transition-colors">
                                The End of the Memory Tax: How Google's TurboQuant is Rewriting the Rules of Local RAG Systems
                            </h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                                A deep dive into embedding compression using TurboQuant (3-bit) and QJL (1-bit), radically reducing memory overhead while maintaining sub-5ms retrieval latency on consumer hardware.
                            </p>
                        </div>
                    </a>

                    {/* Placeholder Article 2 */}
                    <a href="#" className="group p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/30 shadow-lg shadow-zinc-200/50 dark:shadow-none backdrop-blur hover:bg-zinc-50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-white/10 transition-all flex flex-col justify-between min-h-[180px]">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="px-3 py-1 bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white text-xs font-bold rounded-full border border-zinc-200 dark:border-white/10 flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" /> Medium Article
                                </span>
                                <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-100 transition-colors">
                                Scaling Distributed State with React & GraphQL
                            </h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                                Architectural blueprints for mitigating race conditions and optimizing DynamoDB indices for real-time applications.
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
