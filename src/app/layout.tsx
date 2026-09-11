import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/shell/app-shell";
import "@/app/globals.css";
import QueryProvider from "@/providers/QueryProvider";

// Primary Sans Typography
const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

// Developer Terminal / Monospace Typography
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

// Separate Viewport Configuration (Next.js 14/15 Spec)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B5D3B",
};

// Global Site Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://riithis.com"),
  title: {
    default: "Nickson Muriithi — Software Engineer & Systems Builder",
    template: "%s | Nickson Muriithi",
  },
  description:
    "Software Engineer specializing in custom quantitative trading infrastructure, MetaTrader 5 pipelines, full-stack Next.js/FastAPI applications, and business automation.",
  keywords: [
    "Nickson Muriithi",
    "RIITHIS",
    "Software Engineer",
    "Systems Builder",
    "Full-Stack Engineering",
    "Quantitative Trading",
    "MetaTrader 5",
    "MQL5",
    "Python",
    "TypeScript",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Nickson Muriithi", url: "https://riithis.com" }],
  creator: "Nickson Muriithi",
  publisher: "RIITHIS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riithis.com",
    title: "Nickson Muriithi — Software Engineer & Systems Builder",
    description:
      "High-performance custom software, quantitative trading engines, and full-stack web applications.",
    siteName: "RIITHIS Software Engineering",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${sansFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <head>
        {/* Performance pre-connects for dynamic asset delivery */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-background text-text-primary antialiased min-h-screen font-sans selection:bg-brand selection:text-black">
        <QueryProvider>
          <AppShell>{children}</AppShell>
        </QueryProvider>
      </body>
    </html>
  );
}
