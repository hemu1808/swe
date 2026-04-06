"use client";
import { motion } from "framer-motion";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// UPDATED SKILLS based on advanced Full Stack & AI Profile
const skills = [
  { name: "Backend / APIs", value: 95 },
  { name: "React / Frontend", value: 90 },
  { name: "DB / Architecture", value: 85 },
  { name: "AI / RAG", value: 80 },
  { name: "Cloud / AWS", value: 85 }
];

export const SkillRadar = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const radius = 80;
  const center = 125;
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

  const isLight = mounted && resolvedTheme === "light";
  const gridColor = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)";
  const textColor = isLight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.8)";
  const pathFill = isLight ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.2)";

  return (
    <div className="relative flex justify-center items-center py-6 w-full">
      <svg width="320" height="320" className="overflow-visible max-w-full">
        {/* Background Grid Circles */}
        {[20, 40, 60, 80, 100].map((r, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={(r / 100) * radius}
            fill="none"
            stroke={gridColor}
            strokeDasharray="4 4"
          />
        ))}

        {/* Data Path */}
        <motion.path
          d={pathData}
          fill={pathFill}
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Labels */}
        {skills.map((s, i) => {
          const { x, y } = getCoordinates(135, i);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill={textColor}
              fontSize="11"
              fontWeight="600"
              textAnchor="middle"
              alignmentBaseline="middle"
              className={isLight ? "" : "drop-shadow-md"}
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};