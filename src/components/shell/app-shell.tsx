"use client";

import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { PageTransition } from "./page-transition";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0C0A09] text-stone-200 selection:bg-amber-500/30 selection:text-amber-200 antialiased font-sans">
      
      {/* AMBIENT STUDIO LIGHTING OVERLAY */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,53,15,0.12),rgba(255,255,255,0))]" 
        aria-hidden="true" 
      />

      {/* HEADER NAVIGATION */}
      <Header />

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 flex flex-col w-full">
        <PageTransition>{children}</PageTransition>
      </main>

      {/* FOOTER */}
      <Footer />
      
    </div>
  );
}