import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { TechnicalChallenge } from "@/data/caseStudies";

interface ChallengeCardProps {
  challenge: TechnicalChallenge;
  className?: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  className = "",
}) => {
  return (
    <div
      className={`relative group p-5 md:p-6 rounded-xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md space-y-4 shadow-xl hover:border-amber-500/50 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Ambient Top Spotlight Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Challenge Title */}
      <h4 className="font-mono text-sm md:text-base font-bold text-stone-100 uppercase tracking-wide">
        {challenge.title}
      </h4>

      {/* Technical Bottleneck Section */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-amber-500 uppercase tracking-widest">
          <AlertCircle className="h-3.5 w-3.5 text-amber-500/90" />
          <span>SYS_BOTTLENECK :: TECHNICAL_CHALLENGE</span>
        </div>
        <p className="text-xs text-stone-300/90 font-sans leading-relaxed">
          {challenge.problem}
        </p>
      </div>

      {/* Architectural Resolution Section */}
      <div className="space-y-1.5 pt-3 border-t border-stone-800/80">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/90" />
          <span>SYS_RESOLUTION :: ARCHITECTURAL_SOLUTION</span>
        </div>
        <p className="text-xs text-stone-300/90 font-sans leading-relaxed">
          {challenge.resolution}
        </p>
      </div>
    </div>
  );
};