import React from "react";
import { Cpu, Terminal, Layers } from "lucide-react";
import { ArchitectureComponent } from "@/data/caseStudies";

interface ArchitectureDiagramProps {
  diagramText: string;
  components: ArchitectureComponent[];
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  diagramText,
  components,
  className = "",
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. ASCII Architectural Topology Window */}
      <div className="relative rounded-xl border border-stone-800/80 bg-stone-950/90 overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-stone-800/80 bg-stone-900/80 font-mono text-[11px] text-stone-400">
          <div className="flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-semibold text-stone-200 tracking-wider uppercase">
              VERIFIED_SYSTEM_TOPOLOGY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="text-[10px] tracking-widest text-stone-500 uppercase">
              ASCII_MAP :: ACTIVE
            </span>
          </div>
        </div>

        {/* ASCII Diagram Output */}
        <div className="p-4 md:p-6 overflow-x-auto bg-stone-950 selection:bg-amber-500/30 selection:text-amber-200">
          <pre className="font-mono text-xs md:text-sm text-amber-400/90 leading-relaxed tracking-normal whitespace-pre">
            {diagramText.trim()}
          </pre>
        </div>
      </div>

      {/* 2. Layer Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {components.map((c, idx) => (
          <div
            key={idx}
            className="relative group p-4 md:p-5 rounded-xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md space-y-3 shadow-lg hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient Card Top Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="space-y-2">
              {/* Layer Title & Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-amber-500/80" />
                  {c.layer}
                </span>
                <span className="font-mono text-[9px] text-stone-600">
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
              </div>

              {/* Layer Description */}
              <p className="text-xs text-stone-300/90 font-sans leading-relaxed">
                {c.description}
              </p>
            </div>

            {/* Technologies Stack Badges */}
            <div className="pt-2 border-t border-stone-800/60">
              <div className="flex flex-wrap gap-1.5">
                {c.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-950/80 border border-stone-800/80 text-stone-400 hover:text-amber-400 hover:border-stone-700 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};