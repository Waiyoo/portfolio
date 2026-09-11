import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0C0A09] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold shadow-md hover:shadow-amber-500/20",
        secondary:
          "bg-stone-900/60 border border-amber-900/40 text-stone-200 hover:bg-amber-500/10 hover:border-amber-500/50 hover:text-amber-300 shadow-sm",
        outline:
          "border border-amber-900/40 bg-transparent text-stone-200 hover:bg-amber-500/10 hover:border-amber-500/50 hover:text-amber-300",
        ghost:
          "bg-transparent text-stone-400 hover:text-amber-300 hover:bg-stone-900/50",
        accent:
          "bg-amber-500/10 border border-amber-500/30 text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/60 font-bold shadow-sm",
        danger:
          "bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-950/60 hover:border-rose-500/60",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-xs sm:text-sm",
        lg: "h-12 px-6 text-sm sm:text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin text-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 8.627 0 12h4z"
            />
          </svg>
        )}

        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };