"use client";

import React from "react";
import Link from "next/link";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { SYSTEM_META } from "@/lib/navigation-config";
import { Code2, ArrowUpRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/30 bg-stone-950/80 backdrop-blur-xl text-stone-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-[4.5rem] items-center justify-between">
        
        {/* BRAND TERMINAL IDENTIFIER */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-base font-bold tracking-tight text-stone-100 hover:text-amber-300 transition-colors group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-all shadow-sm">
            <Code2 className="h-4 w-4" />
          </span>
          <span>
            Nickson<span className="text-amber-400">.</span>
          </span>
        </Link>

        {/* CENTRAL NAVIGATION ITEMS */}
        <DesktopNav />

        {/* RIGHT CTA BLOCK & MOBILE DRAWER */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border-amber-900/40 bg-stone-900/40 px-4 py-2 font-mono text-xs font-semibold text-amber-200/90 hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/10 transition-all shadow-sm"
            asChild
          >
            <Link href={SYSTEM_META.ctaHref}>
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-amber-400" />
            </Link>
          </Button>

          {/* MOBILE NAVIGATION DRAWER */}
          <MobileNav />
        </div>

      </div>
    </header>
  );
}