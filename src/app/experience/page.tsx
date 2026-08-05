"use client";

import { Navbar } from "@/components/Navbar";
import { ScrollFadeIn } from "@/components/ScrollFadeIn";
import Silk from "@/components/Silk";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  Code2,
  Rocket,
  Server,
  Terminal,
  Zap,
  Cpu,
  Shield,
  Database,
  Layers,
  MapPin,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Activity,
  Flame,
  Key,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { experienceData, ExperiencePoint, CaseStudyData } from "@/data/experience";

const iconMap = {
  Zap,
  Server,
  Code2,
  Terminal,
  Rocket,
  Cpu,
  Shield,
  Database,
  Layers,
};

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("speeler-tech"); // Default Speeler open

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative min-h-screen text-zinc-900 dark:text-zinc-50 selection:bg-yellow-500/30 font-sans">
      {/* Background Layer: React Bits Silk component */}
      <div className="fixed inset-0 w-full h-full -z-10 bg-zinc-50 dark:bg-black transition-colors duration-500">
        <Silk speed={5} scale={1} color="#c29800" noiseIntensity={1.5} rotation={0} />
      </div>

      {/* Dynamic Background Overlay for contrast */}
      <div className="fixed inset-0 w-full h-full -z-[5] bg-gradient-to-b from-white/50 via-white/40 to-white/80 dark:from-black/50 dark:via-black/40 dark:to-black/80 pointer-events-none mix-blend-multiply transition-colors duration-500" />

      <Navbar />

      <main className="mx-auto max-w-[1400px] px-6 pb-32 pt-32 relative z-10">
        <ScrollFadeIn>
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:underline transition-all uppercase tracking-widest mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <h1 className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-5xl py-2 drop-shadow-sm">
              Engineering Experience
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
              Architecting distributed systems, enterprise AI pipelines, and high-throughput backend infrastructure. Click anywhere on any card to explore its architecture case study, trade-offs, and production post-mortems.
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="space-y-10">
            {experienceData.map((exp) => {
              const isExpanded = expandedId === exp.id;
              const caseStudy: CaseStudyData | undefined = exp.caseStudy;

              return (
                <div
                  key={exp.id}
                  onClick={() => toggleExpand(exp.id)}
                  className={`relative group rounded-3xl border transition-all duration-300 bg-white/70 dark:bg-zinc-950/70 p-6 md:p-10 backdrop-blur-2xl overflow-hidden cursor-pointer ${
                    isExpanded
                      ? "border-yellow-500/50 shadow-[0_0_90px_-20px_rgba(194,152,0,0.25)] dark:shadow-[0_0_90px_-20px_rgba(194,152,0,0.35)]"
                      : "border-zinc-200 dark:border-white/10 hover:border-yellow-500/30 shadow-lg"
                  }`}
                >
                  {/* Inner glow effect */}
                  <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-[100px]" />

                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/10">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                          <Briefcase className="w-7 h-7 text-yellow-500 shrink-0" />
                          {exp.role}
                        </h2>

                        {caseStudy && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                              isExpanded
                                ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400 shadow-sm"
                                : "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 group-hover:border-yellow-500/40 group-hover:text-yellow-500"
                            }`}
                          >
                            <span>Deep Dive</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </span>
                        )}

                        {exp.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            CURRENT
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 mt-2 text-base font-medium flex-wrap">
                        <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{exp.company}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
                          <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-left md:text-right shrink-0 flex flex-col md:items-end gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3.5 py-1 text-xs md:text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period}
                      </span>

                      <div className="flex flex-wrap md:justify-end gap-1.5 max-w-md">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-2.5 py-0.5 rounded-md font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullets */}
                  <div className="mt-8 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" /> Key Impact & Deliverables
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {exp.points.map((point: ExperiencePoint, i: number) => {
                        const IconComponent = iconMap[point.icon] || Zap;
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-50/60 dark:bg-white/[0.02] border border-zinc-200/50 dark:border-white/5 transition-colors hover:border-yellow-500/20"
                          >
                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <strong className="text-zinc-900 dark:text-white font-semibold text-sm block mb-1">
                                {point.title}
                              </strong>
                              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
                                {point.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expanded In-Depth System Case Study */}
                  {caseStudy && isExpanded && (
                    <div className="mt-8 pt-8 border-t border-yellow-500/30 space-y-8 animate-fadeIn">
                      {caseStudy.subtitle && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 text-center">
                          <span className="text-xs uppercase tracking-widest text-yellow-600 dark:text-yellow-400 font-bold block mb-1">
                            System Architecture Case Study
                          </span>
                          <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                            {caseStudy.subtitle}
                          </h4>
                        </div>
                      )}

                      {/* Grid Sections: Business Problem & Architecture */}
                      <div className="grid gap-6 lg:grid-cols-2">
                        {/* Business Problem */}
                        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/50 p-6">
                          <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
                            <Activity className="w-5 h-5 text-yellow-500" /> Business Context & Problem
                          </h4>
                          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                            {caseStudy.businessProblem.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-yellow-500 font-bold text-base leading-none">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* System Architecture */}
                        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/50 p-6">
                          <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
                            <Layers className="w-5 h-5 text-blue-500" /> System Architecture & Workflow
                          </h4>
                          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                            {caseStudy.architecture.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold text-base leading-none">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Why Architecture & Alternatives */}
                      <div className="grid gap-6 lg:grid-cols-2">
                        {/* Why This Architecture */}
                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] p-6">
                          <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Why This Architecture Worked
                          </h4>
                          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                            {caseStudy.whyArchitecture.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold text-base leading-none">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Alternative Approaches Considered */}
                        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.02] p-6">
                          <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
                            <HelpCircle className="w-5 h-5 text-amber-500" /> Alternatives Considered & Rejected
                          </h4>
                          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                            {caseStudy.alternativeApproaches.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold text-base leading-none">↳</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Engineering Trade-Offs, Technical Challenges & Production Incidents */}
                      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-6 space-y-6">
                        <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
                          <AlertTriangle className="w-5 h-5 text-red-500" /> Deep Dive: Hard Engineering Realities
                        </h4>

                        <div className="grid gap-6 md:grid-cols-3">
                          {/* Hardest Challenge */}
                          <div className="p-4 rounded-xl bg-white/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-white/10 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                              Biggest Technical Challenge
                            </span>
                            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                              {caseStudy.biggestTechnicalChallenge}
                            </p>
                          </div>

                          {/* Production Incident */}
                          <div className="p-4 rounded-xl bg-white/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-white/10 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block">
                              Biggest Production Issue
                            </span>
                            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                              {caseStudy.biggestProductionIssue}
                            </p>
                          </div>

                          {/* Biggest Mistake */}
                          <div className="p-4 rounded-xl bg-white/60 dark:bg-zinc-950/60 border border-zinc-200 dark:border-white/10 space-y-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                              Biggest Mistake & Retrospective
                            </span>
                            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                              {caseStudy.biggestMistake}
                            </p>
                          </div>
                        </div>

                        {/* Tradeoffs List */}
                        {caseStudy.tradeoffs.length > 0 && (
                          <div className="pt-4 border-t border-red-500/10">
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                              Architectural Trade-offs Accepted:
                            </span>
                            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                              {caseStudy.tradeoffs.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-red-500 font-bold">⚖</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Scaling, Security & Performance Metrics */}
                      <div className="grid gap-6 md:grid-cols-3">
                        {/* Scaling */}
                        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/50 p-5">
                          <h5 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
                            <Rocket className="w-4 h-4 text-blue-500" /> Scaling Strategy
                          </h5>
                          <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                            {caseStudy.scaling.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-blue-500">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Security */}
                        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/50 p-5">
                          <h5 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
                            <Key className="w-4 h-4 text-emerald-500" /> Security & Isolation
                          </h5>
                          <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                            {caseStudy.security.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-500">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Performance */}
                        <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/50 p-5">
                          <h5 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
                            <Flame className="w-4 h-4 text-yellow-500" /> Performance Benchmarks
                          </h5>
                          <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                            {caseStudy.performance.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-yellow-500">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Lessons Learned & Follow-Up Questions */}
                      <div className="grid gap-6 lg:grid-cols-2">
                        {/* Lessons Learned */}
                        <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/[0.03] p-6">
                          <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
                            <Sparkles className="w-5 h-5 text-yellow-500" /> Core Engineering Lessons
                          </h4>
                          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                            {caseStudy.lessonsLearned.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-yellow-500 font-bold">💡</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Common Interview Follow-Up Questions */}
                        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/[0.03] p-6">
                          <h4 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2.5 mb-4">
                            <HelpCircle className="w-5 h-5 text-purple-500" /> Common Follow-Up Questions
                          </h4>
                          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300 font-mono">
                            {caseStudy.followUpQuestions.map((item, idx) => (
                              <li key={idx} className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollFadeIn>
      </main>
    </div>
  );
}
