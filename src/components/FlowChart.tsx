"use client";
import React from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useTheme } from 'next-themes';
import { useMounted } from '@/lib/useMounted';

// Static node definitions — no state needed since they never change
const nodes = [
  { id: '1', position: { x: 0, y: 50 }, data: { label: 'System Architecture' }, type: 'input', className: 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/20 text-zinc-900 dark:text-white rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '2', position: { x: 180, y: -20 }, data: { label: 'Iterative Dev' }, className: 'bg-blue-100 dark:bg-blue-900/40 border-blue-400 dark:border-blue-500/50 text-blue-900 dark:text-blue-100 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '3', position: { x: 180, y: 120 }, data: { label: 'Data / AI Layer' }, className: 'bg-indigo-100 dark:bg-indigo-900/40 border-indigo-400 dark:border-indigo-500/50 text-indigo-900 dark:text-indigo-100 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '4', position: { x: 380, y: 50 }, data: { label: 'CI/CD Pipeline' }, className: 'bg-emerald-100 dark:bg-emerald-900/40 border-emerald-400 dark:border-emerald-500/50 text-emerald-900 dark:text-emerald-100 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '5', position: { x: 550, y: 50 }, data: { label: 'Production Scale' }, type: 'output', className: 'bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white rounded-lg shadow-xl dark:shadow-[0_0_15px_rgba(255,255,255,0.3)] text-xs font-bold uppercase tracking-wide' },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, className: 'stroke-blue-500', style: { strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, className: 'stroke-indigo-500', style: { strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, className: 'stroke-emerald-500', style: { strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, className: 'stroke-emerald-500', style: { strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, className: 'stroke-zinc-500 dark:stroke-white', style: { strokeWidth: 2 } },
];

export const FlowChart = () => {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const dotsColor = mounted && resolvedTheme === "light"
    ? "rgba(0, 0, 0, 0.08)"
    : "rgba(255, 255, 255, 0.1)";

  return (
    <div style={{ width: '100%', height: '350px' }} className="border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-black/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color={dotsColor} />
      </ReactFlow>
    </div>
  );
};