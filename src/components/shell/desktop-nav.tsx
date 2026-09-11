"use client";

import React from "react";
import { MAIN_NAV_ITEMS } from "@/lib/navigation-config";
import { ActiveLink } from "./active-link";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs">
      {MAIN_NAV_ITEMS.map((item) => (
        <ActiveLink
          key={item.href}
          href={item.href}
          className="rounded-full px-3.5 py-1.5 text-stone-400 transition-all duration-200 hover:text-amber-300 hover:bg-stone-900/40"
          activeClassName="bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/30 shadow-sm"
        >
          {item.label}
        </ActiveLink>
      ))}
    </nav>
  );
}