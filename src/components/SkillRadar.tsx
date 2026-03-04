"use client";
import { motion } from "framer-motion";

// UPDATED SKILLS based on advanced Full Stack & AI Profile
const skills = [
  { name: "Backend / APIs", value: 95 },
  { name: "React / Frontend", value: 90 },
  { name: "DB / Architecture", value: 85 },
  { name: "AI / RAG", value: 80 },
  { name: "Cloud / AWS", value: 85 }
];

export const SkillRadar = () => {
  const radius = 100;
  const center = 130;
  const angleSlice = (Math.PI * 2) / skills.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const pathData = skills.map((s, i) => {
    const { x, y } = getCoordinates(s.value, i);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ") + " Z";

  return (
    <div className="relative flex justify-center items-center py-10">
      <svg width="260" height="260" className="overflow-visible">
        {/* Background Grid Circles */}
        {[20, 40, 60, 80, 100].map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
        ))}

        {/* Data Path */}
        <motion.path
          d={pathData}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Labels */}
        {skills.map((s, i) => {
          const { x, y } = getCoordinates(120, i); // Push labels out slightly
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill="rgba(255,255,255,0.6)"
              fontSize="10"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};