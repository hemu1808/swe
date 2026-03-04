"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = [
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 flex items-center justify-between gap-6 md:gap-12 rounded-full border border-white/10 bg-zinc-950/60 px-8 py-4 backdrop-blur-xl shadow-2xl"
    >
      <Link href="/" className="text-xl font-bold tracking-tight text-white shrink-0">
        Hemanth<span className="text-blue-500">.</span>
      </Link>

      {/* Separator */}
      <div className="h-4 w-px bg-white/20 hidden md:block"></div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden ml-auto text-zinc-400 hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
        )}
      </button>

      <nav className="hidden gap-8 md:flex items-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
          >
            {item.name}
          </Link>
        ))}
        {/* Showcase Link (Normal) */}
        <Link
          href="/showcase"
          className="text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
        >
          Showcase 3D
        </Link>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 w-[calc(100vw-2rem)] mx-4 md:hidden bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/showcase"
            className="text-sm font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Showcase 3D
          </Link>
        </motion.nav>
      )}

      {/* Socials & CTA */}
      <div className="hidden md:flex items-center gap-6 shrink-0 border-l border-white/10 pl-6 ml-4">
        <a href="mailto:hemanth.mangalapurapu@gmail.com" className="text-zinc-400 hover:text-white transition-colors" title="hemanth.mangalapurapu@gmail.com">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
        </a>
        <a href="https://github.com/hemu1808/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
        </a>
        <a href="https://www.linkedin.com/in/mangalapurapu/" target="_blank" className="text-zinc-400 hover:text-white transition-colors mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
        </a>
        <a
          href="/resume.pdf"
          className="relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-white px-5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-transform hover:scale-105 active:scale-95"
        >
          <span>Resume</span>
        </a>
      </div>

      {/* Mobile Socials */}
      <div className="flex md:hidden items-center gap-4">
        <a href="mailto:hemanth.mangalapurapu@gmail.com" className="text-zinc-400 hover:text-white transition-colors" title="hemanth.mangalapurapu@gmail.com">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
        </a>
        <a href="https://github.com/hemu1808/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
        </a>
        <a href="https://www.linkedin.com/in/mangalapurapu/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
        </a>
      </div>

    </motion.header>
  );
};