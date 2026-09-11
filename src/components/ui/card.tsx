import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-slate-100 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0B5D3B]/60 hover:shadow-slate-950/50",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 border-b border-slate-800/80 pb-4 mb-4", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold tracking-tight text-slate-100 font-sans", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-slate-400 font-sans leading-relaxed", className)} {...props}>
    {children}
  </p>
);