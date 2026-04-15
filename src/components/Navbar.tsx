"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { getAssetPath, SITE_CONFIG } from "@/lib/utils";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/skills" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Showcase 3D", href: "/showcase" },
];

/** Reusable social icon links — used for both desktop and mobile nav */
function SocialLinks({ iconSize = 18 }: { iconSize?: number }) {
  return (
    <>
      <a
        href={`mailto:${SITE_CONFIG.email}`}
        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        aria-label="Send email"
        title={SITE_CONFIG.email}
      >
        <Mail width={iconSize} height={iconSize} />
      </a>
      <a
        href={SITE_CONFIG.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        aria-label="GitHub profile"
      >
        <Github width={iconSize} height={iconSize} />
      </a>
      <a
        href={SITE_CONFIG.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        aria-label="LinkedIn profile"
      >
        <Linkedin width={iconSize} height={iconSize} />
      </a>
    </>
  );
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 flex items-center justify-between gap-6 md:gap-12 rounded-full border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-950/60 px-8 py-4 backdrop-blur-xl shadow-lg dark:shadow-2xl"
    >
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white shrink-0">
        Hemanth<span className="text-blue-500">.</span>
      </Link>

      {/* Desktop Separator */}
      <div className="h-4 w-px bg-zinc-300 dark:bg-white/20 hidden md:block" />

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden ml-auto text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden gap-8 md:flex items-center" aria-label="Main navigation">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-xs font-semibold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(calc(100vw-2rem),320px)] md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-white/10">
              <SocialLinks iconSize={16} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop Socials & CTA */}
      <div className="hidden md:flex items-center gap-6 shrink-0 border-l border-zinc-200 dark:border-white/10 pl-6 ml-4">
        <SocialLinks iconSize={18} />
        <a
          href={getAssetPath("/resume.pdf")}
          className="relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-zinc-900 text-white dark:bg-zinc-100 flex-shrink-0 px-5 text-xs font-bold uppercase tracking-widest dark:text-black shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-transform hover:scale-105 active:scale-95"
        >
          <span>Resume</span>
        </a>
        <ThemeToggle />
      </div>

      {/* Mobile Socials (always visible in pill bar) */}
      <div className="flex md:hidden items-center gap-4">
        <SocialLinks iconSize={16} />
      </div>
    </motion.header>
  );
};