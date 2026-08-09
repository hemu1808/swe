"use client";
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let isMounted = true;
    const currentTheme = resolvedTheme === "light" ? "default" : "dark";

    mermaid.initialize({
      startOnLoad: false,
      theme: currentTheme,
      securityLevel: "loose",
      fontFamily: "inherit",
    });

    const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    mermaid
      .render(id, chart)
      .then(({ svg: renderedSvg }) => {
        if (isMounted) {
          setSvg(renderedSvg);
        }
      })
      .catch((err) => {
        console.error("Mermaid rendering error:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [chart, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="my-6 p-6 rounded-2xl bg-zinc-900/60 dark:bg-black/60 border border-zinc-200 dark:border-white/10 overflow-x-auto flex justify-center items-center backdrop-blur shadow-xl"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
