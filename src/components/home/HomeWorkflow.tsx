import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import { FlowChart } from "@/components/FlowChart";

export function HomeWorkflow() {
    return (
        <ScrollFadeIn>
            <section id="workflow" className="mt-24 md:mt-32 max-w-5xl mx-auto relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
                <div className="mb-8 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white uppercase tracking-widest text-center flex items-center gap-3">
                        Operational Workflow
                    </h2>
                </div>
                <div className="rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 p-4 md:p-8 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden">
                    <FlowChart />
                </div>
            </section>
        </ScrollFadeIn>
    );
}
