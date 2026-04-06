"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SpotlightCard = ({ children, className, ...props }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  // [Commented out to prevent re-render trap] const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Direct DOM mutation for performance
    div.style.setProperty("--x", `${x}px`);
    div.style.setProperty("--y", `${y}px`);
    
    // [Commented out] setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        // More subtle border and background color
        "relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/80 text-zinc-100 transition-colors duration-300 hover:border-white/10",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500"
        style={{
          opacity,
          // Larger, softer gradient for a more premium feel, using CSS variables
          background: `radial-gradient(1000px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};