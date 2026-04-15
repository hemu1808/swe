"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Boxes, Info } from 'lucide-react';
import ReactFlow, { Background, BackgroundVariant, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { getSystemData } from '@/data/interactiveSystemData';
import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/useMounted';

export function SystemDesignInteractive({ projectId }: { projectId: string }) {
    const data = getSystemData(projectId);
    
    // If we have no structured layout for this project ID, safely return nothing.
    const [nodes, setNodes, onNodesChange] = useNodesState(data?.nodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges || []);
    const [activeNodeId, setActiveNodeId] = useState<string | null>(data?.nodes[0]?.id || null);
    const { resolvedTheme } = useTheme();
    const mounted = useMounted();

    useEffect(() => {
        if (!data) return;
        
        // Dynamically style nodes based on selection by appending tailwind overrides
        setNodes(data.nodes.map((n) => {
            const isActive = n.id === activeNodeId;
            return {
                ...n,
                className: isActive 
                    ? `${n.className} ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)] dark:shadow-[0_0_20px_rgba(59,130,246,0.6)]`
                    : n.className
            };
        }));
    }, [activeNodeId, setNodes, data]);

    if (!data) return null; // Component hides if no data mapped for ID

    const activePanelData = data.panelMap[activeNodeId || data.nodes[0].id];
    const ActiveIcon = activePanelData.icon;

    const bgColor = mounted && resolvedTheme === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)";

    return (
        <div className="mt-16 pt-16 border-t border-zinc-200 dark:border-white/10 w-full fade-in">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Boxes className="w-5 h-5 text-blue-500" /> Interactive System Design
            </h3>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Left Side: React Flow Diagram Stage */}
                <div className="lg:col-span-3 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative shadow-xl shadow-zinc-200/50 dark:shadow-2xl h-[450px]">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onNodeClick={(_, node) => setActiveNodeId(node.id)}
                        fitView
                        attributionPosition="bottom-left"
                        proOptions={{ hideAttribution: true }}
                        nodesDraggable={true}
                    >
                        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color={bgColor} />
                    </ReactFlow>
                    <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none text-xs text-zinc-600 dark:text-zinc-500 bg-zinc-100/80 dark:bg-black/50 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 backdrop-blur shadow-sm dark:shadow-none">
                       <Info className="w-3 h-3" /> Click nodes to inspect engineering flow
                    </div>
                </div>

                {/* Right Side: Interactive Explainer Panel */}
                <div className="lg:col-span-2">
                    <div className="rounded-3xl border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-900/40 backdrop-blur p-8 h-full min-h-[450px] flex flex-col relative overflow-hidden shadow-xl shadow-zinc-200/50 dark:shadow-2xl">
                        <AnimatePresence mode="wait">
                            {activeNodeId && (
                                <motion.div
                                    key={activeNodeId}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="mb-6">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-zinc-200 dark:border-white/10 text-blue-600 dark:text-blue-400 mb-6 drop-shadow-sm dark:drop-shadow-lg">
                                            <ActiveIcon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight mb-4">
                                            {activePanelData.title}
                                        </h4>
                                        
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {activePanelData.tech.map((t: string) => (
                                                <span key={t} className="px-3 py-1.5 text-xs font-mono bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 rounded-lg whitespace-nowrap shadow-sm dark:shadow-none">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <h5 className="text-xs tracking-widest text-zinc-600 dark:text-zinc-500 font-bold uppercase mb-3">Engineering Insight</h5>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed border-l-2 border-blue-500/50 pl-4 py-1 italic bg-gradient-to-r from-blue-500/5 to-transparent">
                                            {activePanelData.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
