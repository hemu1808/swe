"use client";
import { motion } from "framer-motion";
import React from "react";

export const ScrollFadeIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }} // Custom cubic-bezier for a premium feel
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};