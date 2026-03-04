"use client";
import React from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Define initial nodes
const initialNodes = [
  { id: '1', position: { x: 0, y: 50 }, data: { label: 'System Architecture' }, type: 'input', className: 'bg-zinc-900 border-white/20 text-white rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '2', position: { x: 180, y: -20 }, data: { label: 'Iterative Dev' }, className: 'bg-blue-900/40 border-blue-500/50 text-blue-100 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '3', position: { x: 180, y: 120 }, data: { label: 'Data / AI Layer' }, className: 'bg-indigo-900/40 border-indigo-500/50 text-indigo-100 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '4', position: { x: 380, y: 50 }, data: { label: 'CI/CD Pipeline' }, className: 'bg-emerald-900/40 border-emerald-500/50 text-emerald-100 rounded-lg shadow-xl text-xs font-bold uppercase tracking-wide' },
  { id: '5', position: { x: 550, y: 50 }, data: { label: 'Production Scale' }, type: 'output', className: 'bg-white text-black border-white rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] text-xs font-bold uppercase tracking-wide' },
];

// Define initial edges (connections)
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#ffffff', strokeWidth: 2 } },
];

export const FlowChart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    // The container needs a fixed height
    <div style={{ width: '100%', height: '350px' }} className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="rgba(255, 255, 255, 0.1)" />
      </ReactFlow>
    </div>
  );
};