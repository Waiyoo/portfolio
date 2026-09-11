"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";

export function PublicNavigation() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/30 bg-stone-950/80 backdrop-blur-xl text-stone-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-[4.5rem] items-center justify-between">
        
        {/* BRAND IDENTITY */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 font-mono text-base font-bold tracking-tight text-stone-100 hover:text-amber-300 transition-colors group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-all">
            <Code2 className="h-4 w-4" />
          </span>
          <span>
            Nickson<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden items-center gap-8 font-mono text-xs text-stone-400 md:flex">
          <Link href="/about" className="hover:text-amber-300 transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-amber-300 transition-colors">
            Services
          </Link>
          <Link href="/projects" className="hover:text-amber-300 transition-colors">
            Work
          </Link>
        </nav>

        {/* CTA BUTTON */}
        <Link 
          href="/contact" 
          className="inline-flex items-center gap-2 rounded-full border border-amber-900/40 bg-stone-900/40 px-4 py-2 font-mono text-xs font-semibold text-amber-200/90 hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/10 transition-all shadow-sm"
        >
          <span>Let&apos;s talk</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-amber-400" />
        </Link>

      </div>
    </header>
  );
}