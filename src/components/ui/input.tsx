import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-slate-800 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 font-sans transition-all duration-200 focus:border-[#0B5D3B] focus:outline-none focus:ring-1 focus:ring-[#0B5D3B]/30 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && !error && <p className="text-xs text-slate-400 font-mono">{hint}</p>}
        {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";