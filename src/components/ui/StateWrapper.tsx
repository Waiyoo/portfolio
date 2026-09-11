import React from "react";
import { RefreshCw, AlertTriangle, Inbox } from "lucide-react";

interface StateWrapperProps {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  error?: Error | null;
  onRetry?: () => void;
  skeletonCount?: number;
  skeletonHeight?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  className?: string;
  children: React.ReactNode;
}

export const StateWrapper: React.FC<StateWrapperProps> = ({
  isLoading,
  isError,
  isEmpty,
  error,
  onRetry,
  skeletonCount = 3,
  skeletonHeight = "h-48",
  emptyTitle = "No records found",
  emptyMessage = "There are no entries available in the database at this time.",
  className = "",
  children,
}) => {
  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className={`w-full ${skeletonHeight} relative bg-stone-900/60 border border-stone-800/80 rounded-xl animate-pulse p-6 flex flex-col justify-between backdrop-blur-md overflow-hidden shadow-lg`}
          >
            {/* Ambient Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

            {/* Skeleton Telemetry & Content Placeholder */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500/50 animate-ping" />
                <div className="h-3 bg-stone-800/80 rounded-xs w-28" />
              </div>
              <div className="h-5 bg-stone-800/60 rounded-xs w-3/4" />
              <div className="h-3 bg-stone-800/40 rounded-xs w-1/2" />
            </div>

            {/* Skeleton Footer Bar */}
            <div className="h-9 bg-stone-950/80 border border-stone-800/60 rounded-lg w-full flex items-center px-4 justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-600">
                FETCHING_RECORD...
              </span>
              <div className="h-2.5 w-2.5 rounded-full bg-stone-800" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className={`relative w-full rounded-xl border border-rose-900/50 bg-stone-900/70 p-8 md:p-10 text-center backdrop-blur-md shadow-2xl overflow-hidden ${className}`}>
        {/* Diagnostic Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Telemetry Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-500">
            SYS_STATE :: FETCH_FAILURE
          </span>
        </div>

        {/* Diagnostic Icon */}
        <div className="inline-flex p-3.5 rounded-xl border border-rose-800/60 bg-rose-950/40 text-rose-400 mb-3 shadow-inner">
          <AlertTriangle className="h-8 w-8" />
        </div>

        {/* Diagnostic Title & Error Message */}
        <h3 className="font-mono text-sm md:text-base font-semibold text-stone-200 uppercase tracking-widest">
          Data Fetching Failed
        </h3>
        <p className="text-xs text-stone-400 mt-1.5 max-w-md mx-auto font-sans leading-relaxed">
          {error?.message || "Could not retrieve live data from the server."}
        </p>

        {/* Retry Trigger */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white font-mono text-xs tracking-wider uppercase rounded-lg border border-stone-800 hover:border-amber-500/80 transition-all duration-200 cursor-pointer shadow-md"
          >
            <RefreshCw className="h-3.5 w-3.5 text-amber-500" />
            RETRY_REQUEST
          </button>
        )}
      </div>
    );
  }

  // 3. Empty State
  if (isEmpty) {
    return (
      <div className={`relative w-full rounded-xl border border-stone-800/80 bg-stone-900/60 p-10 md:p-12 text-center backdrop-blur-md shadow-xl overflow-hidden ${className}`}>
        {/* Ambient Top Spotlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        {/* Telemetry Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-stone-500" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-stone-500">
            SYS_STATE :: ZERO_ENTRIES
          </span>
        </div>

        {/* Empty Icon */}
        <div className="inline-flex p-3.5 rounded-xl border border-stone-800/60 bg-stone-950/80 text-stone-400 mb-3 shadow-inner">
          <Inbox className="h-8 w-8" />
        </div>

        {/* Empty Header & Description */}
        <h3 className="font-mono text-xs md:text-sm font-semibold text-stone-200 uppercase tracking-widest">
          {emptyTitle}
        </h3>
        <p className="text-xs text-stone-400 mt-1.5 max-w-sm mx-auto font-sans leading-relaxed">
          {emptyMessage}
        </p>
      </div>
    );
  }

  // 4. Operational Content Render
  return <>{children}</>;
};