"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SpotlightCard = ({ children, className, ...props }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    div.style.setProperty("--x", `${x}px`);
    div.style.setProperty("--y", `${y}px`);
  };

  const handleFocus = () => setOpacity(1);
  const handleBlur = () => setOpacity(0);
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  const isLight = mounted && resolvedTheme === "light";
  const spotlightColor = isLight ? "rgba(59,130,246,0.05)" : "rgba(255,255,255,0.04)";

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-2xl border transition-colors duration-300",
        "bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100",
        "border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10",
        "shadow-xl shadow-zinc-200/50 dark:shadow-none",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500"
        style={{
          opacity,
          background: `radial-gradient(1000px circle at var(--x, 0px) var(--y, 0px), ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};