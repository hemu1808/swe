"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ text, className = "", delay = 0 }) => {
    // Split the text into words so we can animate them individually
    const words = text.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay * 0.1,
            },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 40,
        },
    };

    return (
        <motion.h1
            className={`flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: "0.25em" }}
                    key={index}
                    className="inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.h1>
    );
};
