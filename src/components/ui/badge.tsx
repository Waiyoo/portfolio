import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-3xs font-semibold uppercase tracking-widest border transition-all duration-200 shadow-sm",
  {
    variants: {
      status: {
        completed:
          "bg-emerald-950/40 text-emerald-300 border-emerald-500/30 shadow-emerald-950/20",
        prototype:
          "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-amber-950/20",
        partial:
          "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-amber-950/20",
        info:
          "bg-sky-950/40 text-sky-300 border-sky-500/30 shadow-sky-950/20",
        neutral:
          "bg-stone-900/60 text-stone-400 border-amber-900/30 hover:border-amber-500/30",
      },
    },
    defaultVariants: {
      status: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, status, dot = true, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ status, className }))} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors",
            status === "completed" && "bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]",
            status === "prototype" && "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]",
            status === "partial" && "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]",
            status === "info" && "bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]",
            status === "neutral" && "bg-stone-500"
          )}
        />
      )}
      {children}
    </div>
  );
}