import React from "react";

interface CaseStudySectionProps {
  id: string;
  title: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  id,
  title,
  label,
  children,
  className = "",
}) => {
  return (
    <section
      id={id}
      className={`relative space-y-6 scroll-mt-24 border-t border-stone-800/80 pt-10 pb-4 transition-all duration-300 ${className}`}
    >
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0 pointer-events-none" />

      {/* Section Telemetry Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-amber-500/90 font-semibold">
            SYS_SEC :: {label}
          </span>
        </div>

        <h2 className="font-mono text-xl md:text-2xl font-bold text-stone-100 uppercase tracking-wide">
          {title}
        </h2>
      </div>

      {/* Main Section Content Wrapper */}
      <div className="pt-2 text-stone-300 font-sans leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
};