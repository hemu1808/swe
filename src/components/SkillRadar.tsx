"use client";
import { motion } from "framer-motion";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";
import { radarSkills as skills } from "@/data/skills";

export const SkillRadar = () => {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const radius = 80;
  const center = 160; // 320 / 2 = 160 for perfect SVG centering
  const angleSlice = (Math.PI * 2) / skills.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const pathData =
    skills
      .map((s, i) => {
        const { x, y } = getCoordinates(s.value, i);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ") + " Z";

  const isLight = mounted && resolvedTheme === "light";
  const gridColor = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
  const textColor = isLight ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.85)";
  const pathFill = isLight ? "rgba(59, 130, 246, 0.12)" : "rgba(59, 130, 246, 0.25)";

  return (
    <div className="relative flex justify-center items-center w-full my-auto overflow-hidden">
      <svg
        viewBox="0 0 320 320"
        className="w-full max-w-[280px] sm:max-w-[320px] h-auto overflow-visible mx-auto"
      >
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