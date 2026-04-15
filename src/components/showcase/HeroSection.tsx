import React from "react";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center px-4 relative">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center z-10 cursor-default"
            >
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-none drop-shadow-2xl">
                    A Journey Through <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-600">Code & Systems</span>
                </h1>
                <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
                    Scroll down to dive into the architecture.
                </p>
            </motion.div>
        </div>
    );
}
