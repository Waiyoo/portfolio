"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_ITEMS, SYSTEM_META } from "@/lib/navigation-config";
import { ActiveLink } from "./active-link";
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, ArrowRight } from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-stone-400 hover:text-amber-300 border border-amber-900/40 rounded-lg bg-stone-900/60 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* MOBILE DRAWER OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 top-[4.5rem] z-50 flex flex-col bg-[#0C0A09]/95 backdrop-blur-2xl border-t border-amber-900/30 p-6 animate-in slide-in-from-top-2 duration-200 text-stone-200">
          
          {/* HEADER TERMINAL TITLE */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-amber-900/20">
            <Terminal className="h-4 w-4 text-amber-400" />
            <span className="font-mono text-3xs uppercase tracking-widest text-stone-400">
              SYSTEM_DIRECTORY
            </span>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="flex flex-col gap-2 font-mono text-xs">
            {MAIN_NAV_ITEMS.map((item) => (
              <ActiveLink
                key={item.href}
                href={item.href}
                className="px-4 py-3 rounded-xl border border-transparent hover:border-amber-900/30 hover:bg-stone-900/40 text-stone-400 transition-all"
                activeClassName="text-amber-300 bg-amber-500/10 border-amber-500/30 font-semibold shadow-sm"
              >
                {item.label}
              </ActiveLink>
            ))}
          </nav>

          {/* FOOTER & STATUS CTA */}
          <div className="mt-auto pt-6 border-t border-amber-900/20 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-mono text-3xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{SYSTEM_META.availabilityStatus}</span>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center gap-2 rounded-full border-amber-500/40 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/60 font-mono text-xs font-semibold transition-all shadow-md"
              asChild
            >
              <Link href={SYSTEM_META.ctaHref}>
                <span>{SYSTEM_META.ctaText}</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </Link>
            </Button>
          </div>

        </div>
      )}
    </div>
  );
}