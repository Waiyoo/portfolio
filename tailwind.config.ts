import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // Base Charcoal Canvas
        background: "#090d16", // Deepest background canvas (slate-950)
        surface: {
          DEFAULT: "#0f172a",   // Level 1: Cards & Panels (slate-900)
          hover: "#1e293b",     // Level 1 Hover state (slate-800)
          elevated: "#182238",  // Level 2: Modals & Popovers
          inset: "#06090e",     // Level 0: Code blocks & inset areas
        },
        border: {
          DEFAULT: "#1e293b",   // Subtle card & divider border (slate-800)
          subtle: "#172033",    // Low contrast borders
          strong: "#334155",    // High contrast borders (slate-700)
          focus: "#0284c7",     // Interactive focus ring (sky-600)
        },
        // Typography Colors
        text: {
          primary: "#f8fafc",   // Primary headers & body text (slate-50)
          secondary: "#94a3b8", // Subtitles & metadata (slate-400)
          muted: "#64748b",     // Captions, disables, footnotes (slate-500)
          inverse: "#020617",   // Text on high-contrast backgrounds
        },
        // Functional System Status Colors
        brand: {
          DEFAULT: "#0284c7",   // Core Accent (Sky-600)
          hover: "#0369a1",     // Hover (Sky-700)
          subtle: "rgba(2, 132, 199, 0.1)",
        },
        status: {
          emerald: "#10b981",   // Completed / Production / Live
          emeraldBg: "rgba(16, 185, 129, 0.1)",
          amber: "#f59e0b",     // Prototype / Non-Deployed / Warning
          amberBg: "rgba(245, 158, 11, 0.1)",
          rose: "#ef4444",      // Error / Cancelled / Urgent
          roseBg: "rgba(239, 68, 68, 0.1)",
          sky: "#38bdf8",       // Information / API / Integration
          skyBg: "rgba(56, 189, 248, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.025em" }],
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.025em" }],
        "5xl": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.03em" }],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px", // Engineering sharp 4px radius standard
        md: "6px",
        lg: "8px",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        overlay: "0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;