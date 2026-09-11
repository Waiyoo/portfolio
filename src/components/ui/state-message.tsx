import React from "react";
import { AlertTriangle, FolderX, RefreshCw } from "lucide-react";
import { Button } from "./button";

interface StateMessageProps {
  type: "empty" | "error";
  title: string;
  description: string;
  retryAction?: () => void;
  className?: string;
}

export function StateMessage({
  type,
  title,
  description,
  retryAction,
  className = "",
}: StateMessageProps) {
  const isError = type === "error";

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-xl border backdrop-blur-md shadow-xl overflow-hidden transition-all duration-300 ${
        isError
          ? "border-rose-900/50 bg-stone-900/70"
          : "border-stone-800/80 bg-stone-900/60"
      } ${className}`}
    >
      {/* Ambient Radial Spotlight Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          isError ? "from-rose-500/10" : "from-amber-500/5"
        } via-transparent to-transparent pointer-events-none`}
      />

      {/* Telemetry Header Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isError ? "bg-rose-400" : "bg-stone-500"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isError ? "bg-rose-500" : "bg-stone-400"
            }`}
          />
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-stone-500">
          {isError ? "SYS_STATE :: ERROR_HALT" : "SYS_STATE :: NO_DATA"}
        </span>
      </div>

      {/* State Icon Container */}
      <div
        className={`p-3.5 rounded-xl border mb-3 shadow-inner ${
          isError
            ? "bg-rose-950/40 border-rose-800/60 text-rose-400"
            : "bg-stone-950/80 border-stone-800/60 text-stone-400"
        }`}
      >
        {isError ? (
          <AlertTriangle className="h-8 w-8" />
        ) : (
          <FolderX className="h-8 w-8" />
        )}
      </div>

      {/* Main Title & Description */}
      <h4 className="font-mono text-xs md:text-sm font-semibold text-stone-200 uppercase tracking-widest mb-1.5">
        {title}
      </h4>
      <p className="text-xs text-stone-400 max-w-md font-sans leading-relaxed mb-4">
        {description}
      </p>

      {/* Action Handler */}
      {retryAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={retryAction}
          className="font-mono text-xs tracking-wider uppercase bg-stone-950/80 border-stone-800 hover:border-amber-500/80 hover:bg-stone-900 text-stone-200 hover:text-white transition-all duration-200 gap-2"
        >
          <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
          RETRY_OPERATION
        </Button>
      )}
    </div>
  );
}