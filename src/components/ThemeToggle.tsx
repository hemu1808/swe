"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useMounted } from "@/lib/useMounted";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useMounted();

    // Prevent hydration mismatch — render placeholder until mounted
    if (!mounted) {
        return <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800/50" />;
    }

    const isLight = resolvedTheme === "light";

    return (
        <motion.button
            onClick={() => setTheme(isLight ? "dark" : "light")}
            className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/50 shadow-sm"
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        >
            <motion.div
                initial={false}
                animate={{
                    y: isLight ? 0 : 30,
                    opacity: isLight ? 1 : 0,
                    scale: isLight ? 1 : 0.5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute text-amber-500"
            >
                <Sun className="w-5 h-5" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    y: isLight ? -30 : 0,
                    opacity: isLight ? 0 : 1,
                    scale: isLight ? 0.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute text-blue-400"
            >
                <Moon className="w-5 h-5" />
            </motion.div>
            
            {/* Background flourish */}
            <motion.div 
                className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
                animate={{
                    backgroundColor: isLight ? "#f59e0b" : "#3b82f6"
                }}
                transition={{ duration: 0.5 }}
            />
        </motion.button>
    );
}
