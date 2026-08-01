"use client";

import { Navbar } from "@/components/Navbar";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import Silk from "@/components/Silk";
import { ArrowLeft, Briefcase, Calendar, Code2, Rocket, Server, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { experienceData, ExperiencePoint } from "@/data/experience";

const iconMap = {
  Zap,
  Server,
  Code2,
  Terminal,
  Rocket,
};

export default function Experience() {
  return (
    <div className="relative min-h-screen text-zinc-900 dark:text-zinc-50 selection:bg-yellow-500/30 font-sans">

      {/* Background Layer: React Bits Silk component */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-zinc-50 dark:bg-black transition-colors duration-500">
        <Silk
          speed={5}
          scale={1}
          color="#c29800"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Dynamic Background Overlay for contrast */}
      <div className="fixed inset-0 w-full h-full -z-[5] bg-gradient-to-b from-white/50 via-white/40 to-white/80 dark:from-black/50 dark:via-black/40 dark:to-black/80 pointer-events-none mix-blend-multiply transition-colors duration-500" />

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-32 pt-32 relative z-10">
        <ScrollFadeIn>
          <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-yellow-500 hover:text-yellow-400 transition-colors uppercase tracking-widest mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl py-2 drop-shadow-sm">
              Professional Details
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              Engineering impact at scale. Delivering robust, high-performance backends and seamless front-end experiences.
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="space-y-12">
            {experienceData.map((exp) => (
              <div
                key={exp.id}
                className="relative group rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/60 dark:bg-zinc-950/60 p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_80px_-20px_rgba(194,152,0,0.1)] dark:shadow-[0_0_80px_-20px_rgba(194,152,0,0.2)] overflow-hidden transition-colors duration-500"
              >
                {/* Inner glow effect */}
                <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[100px]" />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 pb-10 border-b border-zinc-200 dark:border-white/10 transition-colors duration-500">
                  <div>
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                      <Briefcase className="w-8 h-8 text-yellow-500" />
                      {exp.role}
                    </h2>
                    <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-300 mt-2">{exp.company}</h3>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      <Calendar className="w-4 h-4" /> {exp.period}
                    </span>
                    <div className="mt-4 flex flex-wrap md:justify-end gap-2">
                      {exp.techStack.map((tech) => (
                        <span key={tech} className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-3 py-1 rounded-full transition-colors duration-500">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {exp.points.map((point: ExperiencePoint, i: number) => {
                    const IconComponent = iconMap[point.icon] || Zap;
                    return (
                      <div key={i} className="flex items-start gap-4 group/point">
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 transition-colors group-hover/point:bg-yellow-500 group-hover/point:text-white dark:group-hover/point:text-black">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg">
                          <strong className="text-zinc-900 dark:text-white font-semibold block mb-1">{point.title}</strong>
                          {point.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        </ScrollFadeIn>
      </main>
    </div>
  );
}
