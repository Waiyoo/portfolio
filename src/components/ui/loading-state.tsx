import React from "react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "EXECUTING_SYSTEM_QUERY...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-12 space-y-5 rounded-xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md shadow-2xl overflow-hidden ${className}`}
    >
      {/* Ambient Warm Spotlight Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Status Telemetry Header */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-stone-500">
          SYS_STATE :: PROCESSING
        </span>
      </div>

      {/* Pulsing Signal Nodes */}
      <div className="relative flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-stone-950/80 border border-stone-800/60 shadow-inner">
        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.8)] animate-bounce [animation-delay:-0.3s]" />
        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.8)] animate-bounce [animation-delay:-0.15s]" />
        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.8)] animate-bounce" />
      </div>

      {/* Query Telemetry Label */}
      <p className="font-mono text-xs uppercase tracking-widest text-stone-400 font-medium text-center max-w-sm">
        {message}
      </p>
    </div>
  );
}