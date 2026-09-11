"use client";

import React from "react";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="w-full border-t border-amber-900/30 bg-stone-950/80 backdrop-blur-xl text-stone-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 py-10 text-sm sm:grid-cols-2 items-center">
        
        {/* BRAND & DESCRIPTION */}
        <div>
          <Link 
            href="/" 
            className="text-lg font-mono font-bold text-stone-100 tracking-tight hover:text-amber-300 transition-colors"
          >
            Nickson<span className="text-amber-400">.</span>
          </Link>
          <p className="mt-3 max-w-sm text-xs font-sans text-stone-400 leading-relaxed font-light">
            Independent software developer building digital products and systems with intent.
          </p>
        </div>

        {/* NAVIGATION & COPYRIGHT */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 sm:justify-end">
          <nav className="flex gap-6 font-mono text-xs text-stone-400">
            <Link href="/projects" className="hover:text-amber-300 transition-colors">
              Work
            </Link>
            <Link href="/services" className="hover:text-amber-300 transition-colors">
              Services
            </Link>
            <Link href="/contact" className="hover:text-amber-300 transition-colors">
              Contact
            </Link>
          </nav>
          <span className="font-mono text-3xs text-stone-500 uppercase tracking-widest">
            © {new Date().getFullYear()}
          </span>
        </div>

      </div>
    </footer>
  );
}