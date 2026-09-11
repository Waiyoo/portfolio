"use client";

import React from "react";
import Link from "next/link";
import { MAIN_NAV_ITEMS, FEATURED_CASE_STUDIES } from "@/lib/navigation-config";

export function Footer() {
  return (
    <footer className="w-full border-t border-amber-900/30 bg-[#0C0A09] py-12 font-sans text-xs text-stone-400">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 md:grid-cols-4">
        
        {/* Column 1: System Identifiers */}
        <div className="space-y-3 md:col-span-1">
          <Link 
            href="/" 
            className="text-lg font-mono font-bold tracking-tight text-stone-100 hover:text-amber-300 transition-colors"
          >
            Nickson<span className="text-amber-400">.</span>
          </Link>
          <p className="text-stone-400 leading-relaxed font-sans font-light text-xs">
            Software Developer specializing in robust full-stack architectures, trading tools, and custom business systems.
          </p>
          <p className="font-mono text-3xs text-stone-500 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Nickson Muriithi. All rights reserved.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="space-y-3">
          <h4 className="font-mono text-3xs font-semibold uppercase tracking-widest text-amber-400/90">
            Navigation
          </h4>
          <ul className="space-y-2 font-mono text-xs">
            {MAIN_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="text-stone-400 hover:text-amber-300 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Featured Case Studies */}
        <div className="space-y-3">
          <h4 className="font-mono text-3xs font-semibold uppercase tracking-widest text-amber-400/90">
            Featured Work
          </h4>
          <ul className="space-y-2 font-mono text-xs">
            {FEATURED_CASE_STUDIES.map((study) => (
              <li key={study.href}>
                <Link 
                  href={study.href} 
                  className="text-stone-400 hover:text-amber-300 transition-colors"
                >
                  {study.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Status & CTA */}
        <div className="space-y-3.5">
          <h4 className="font-mono text-3xs font-semibold uppercase tracking-widest text-amber-400/90">
            Availability
          </h4>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </span>
            <span>Available for select projects</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-amber-900/40 bg-stone-900/40 px-4 py-2 font-mono text-xs font-semibold text-amber-200/90 hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/10 transition-all shadow-sm"
          >
            Start a conversation
          </Link>
        </div>

      </div>
    </footer>
  );
}