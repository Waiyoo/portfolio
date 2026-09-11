import { Terminal } from "lucide-react";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const metadata = {
  title: "Projects",
  description: "Software engineering case studies, mobile social-commerce platforms, quantitative strategy engines, and business automation software.",
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col space-y-12 pb-24">
      {/* ------------------------------------------------------------------- */}
      {/* 1. PROJECTS HERO & TELEMETRY HEADER                                */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-12 md:pt-16 border-b border-stone-800/80 bg-stone-900/40 backdrop-blur-md overflow-hidden">
        {/* Ambient Top Spotlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="container py-12 sm:py-16 flex flex-col space-y-6 relative z-10">
          
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-stone-800 bg-stone-950/80 px-3 py-1.5 font-mono text-[11px] text-amber-500 w-fit shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <Terminal className="h-3.5 w-3.5 text-amber-500" />
            <span className="tracking-widest uppercase">SYS_CATALOG // SELECTED_WORK</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="font-mono text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-100 uppercase">
              Products designed to solve real operational problems.
            </h1>
            <p className="text-base sm:text-lg text-stone-300/90 font-sans leading-relaxed max-w-2xl">
              A growing collection of product concepts and software systems spanning commerce, operations, analytics, and customer experience.
            </p>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. PROJECTS GRID RENDERER                                          */}
      {/* ------------------------------------------------------------------- */}
      <section className="container py-8">
        <ProjectsGrid />
      </section>
    </main>
  );
}