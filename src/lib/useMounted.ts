"use client";

import { useState, useEffect } from "react";

/**
 * Hook to safely detect client-side hydration completion.
 * Use this to prevent hydration mismatches with theme-dependent rendering.
 * Replaces the duplicated `useEffect(() => setMounted(true), [])` pattern.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
