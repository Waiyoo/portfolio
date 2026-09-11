"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  Check,
  Globe2,
  Layers3,
  MoveRight,
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  Database,
  Clock,
  ChevronRight,
  Command,
} from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";

// ============================================================================
// DATA CONFIGURATION & CONSTANTS
// ============================================================================

const CAPABILITIES = [
  {
    number: "01",
    title: "Digital Products",
    text: "Thoughtful web and mobile experiences designed for immediate clarity, fast interaction, and high retention.",
    icon: Globe2,
    tag: "UI/UX & Web",
  },
  {
    number: "02",
    title: "Business Systems",
    text: "Purpose-built internal tools and operational engines that turn manual workflows into visible, reliable processes.",
    icon: Layers3,
    tag: "Automation",
  },
  {
    number: "03",
    title: "Integrations & APIs",
    text: "Secure, high-throughput pipelines connecting payment networks, trading tools, and core data layers.",
    icon: Braces,
    tag: "Architecture",
  },
];

const OUTCOMES = [
  {
    num: "01",
    label: "Scope Certainty",
    detail: "Fixed milestones, strict deliverables, and firm execution timelines from day zero.",
  },
  {
    num: "02",
    label: "Fluid Interfaces",
    detail: "Engineered for device fluidity, rapid response times, and full WCAG accessibility.",
  },
  {
    num: "03",
    label: "Clean Codebases",
    detail: "Modular, well-typed architectures built for low latency and seamless scaling.",
  },
  {
    num: "04",
    label: "Direct Collaboration",
    detail: "Direct engineering support without intermediary project management friction.",
  },
];

const SYSTEM_TABS = [
  { id: "pipeline", label: "Pipeline", icon: Activity },
  { id: "stack", label: "Core Stack", icon: Cpu },
  { id: "status", label: "Health", icon: ShieldCheck },
];

const TECH_STACK_ITEMS = [
  { name: "Next.js 15", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "FastAPI / Python", category: "Backend" },
  { name: "Tailwind CSS", category: "Styling" },
];

const SYSTEM_METRICS = [
  { label: "Core API Latency", value: "< 42ms" },
  { label: "Code Coverage", value: "94.2%" },
  { label: "Security Rating", value: "A+ Grade" },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function HomePage() {
  const [featured, second, third] = PROJECTS_DATA;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0C0A09] text-stone-200 selection:bg-amber-800/40 selection:text-amber-100 font-sans antialiased">
      {/* BACKGROUND ARCHITECTURE */}
      <BackgroundLightingGrid />

      {/* HERO SECTION */}
      <section className="relative border-b border-amber-950/40 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-16"
          >
            {/* Hero Left Messaging */}
            <motion.div variants={fadeInUp} className="lg:col-span-7">
              <div className="mb-6 sm:mb-8 inline-flex flex-wrap items-center gap-3 rounded-full border border-amber-800/30 bg-amber-950/20 px-4 py-2 backdrop-blur-xl shadow-2xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                </span>
                <span className="font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                  Independent Software Studio
                </span>
                <span className="hidden sm:inline-block h-3.5 w-[1px] bg-amber-800/30" />
                <StudioClock />
              </div>

              <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl text-stone-100">
                Software with{" "}
                <em className="font-serif font-normal italic text-amber-400 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  purpose
                </em>
                , engineered to perform.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-400 font-light sm:text-lg">
                I&apos;m Nickson Muriithi, a full-stack developer partnering with ambitious enterprises to construct modern digital products, operational engines, and high-throughput backend infrastructure.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/start-project"
                  className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 px-7 text-sm font-medium text-stone-100 shadow-xl shadow-amber-950/40 transition-all duration-300 hover:shadow-amber-900/60 hover:scale-[1.02] border border-amber-600/30"
                >
                  <span>Start a project</span>
                  <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex h-12 items-center gap-3 rounded-full border border-amber-900/40 bg-stone-900/40 px-7 text-sm font-medium text-stone-200 backdrop-blur-md transition-all duration-300 hover:border-amber-700/50 hover:bg-stone-900/80 hover:text-white"
                >
                  <span>Explore selected work</span>
                  <ArrowUpRight className="h-4 w-4 text-stone-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>

            {/* Hero Right Workstation Widget */}
            <motion.div variants={fadeInUp} className="w-full lg:col-span-5">
              <InteractiveWorkstationWidget />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <Section>
        <SectionHeader eyebrow="Capabilities" title="Built for modern digital excellence." />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {CAPABILITIES.map((cap) => (
            <CapabilityHorizontalCard key={cap.number} capability={cap} />
          ))}
        </div>
      </Section>

      {/* SELECTED WORK SECTION */}
      <section className="border-y border-amber-950/40 bg-gradient-to-b from-stone-900/20 via-stone-900/40 to-transparent py-20 sm:py-28 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Selected Work"
            title="Proof in the product."
            action={{ href: "/projects", label: "View all case studies" }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mt-12 flex flex-col gap-6"
          >
            {[featured, second, third].filter(Boolean).map((proj, idx) => (
              <motion.div key={proj.slug} variants={fadeInUp}>
                <SpotlightCard>
                  <HorizontalProjectRow project={proj} index={idx + 1} />
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY & OUTCOMES */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              A Dependable Partner
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl lg:text-5xl text-stone-100 leading-tight">
              Technical depth for ambitious vision.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-stone-400 font-light">
              Combining architectural rigor with responsive UI execution to deliver production software that scales cleanly and effortlessly.
            </p>
          </div>

          <div className="lg:col-span-7">
            <HorizontalOutcomesGrid outcomes={OUTCOMES} />
          </div>
        </div>
      </Section>

      {/* CALL TO ACTION BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-[2rem] border border-amber-800/30 bg-gradient-to-br from-amber-950/80 via-stone-900/90 to-stone-950 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-2xl"
        >
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-amber-600/10 blur-[100px] pointer-events-none" />
          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="font-mono text-2xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                Have a project in mind?
              </p>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
                Let&apos;s engineer something extraordinary together.
              </h2>
            </div>
            <Link
              href="/start-project"
              className="group inline-flex h-13 shrink-0 items-center justify-center gap-3 rounded-full bg-amber-200 px-8 text-sm font-semibold text-stone-950 transition-all duration-300 hover:bg-amber-100 hover:scale-[1.02] shadow-2xl shadow-amber-950/50"
            >
              <span>Initiate collaboration</span>
              <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

// ============================================================================
// HELPER & UI COMPONENTS
// ============================================================================

function SpotlightCard({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-2xl border border-amber-900/20 bg-stone-900/20 transition-all duration-500 hover:border-amber-700/40 hover:bg-stone-900/40"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              550px circle at ${mouseX}px ${mouseY}px,
              rgba(217, 119, 6, 0.12),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

function BackgroundLightingGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[15%] left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,83,9,0.15)_0%,rgba(0,0,0,0)_75%)] blur-[120px]" />
      <div className="absolute top-[30%] -left-[10%] h-[500px] w-[500px] rounded-full bg-amber-950/20 blur-[140px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,119,6,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,119,6,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}

function StudioClock() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Africa/Nairobi",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1.5 font-mono text-2xs text-stone-400">
      <Clock className="h-3 w-3 text-amber-400" />
      <span>NBO {timeStr || "10:00:00"}</span>
    </div>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="font-mono text-2xs uppercase tracking-[0.2em] text-amber-400 font-semibold">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-medium tracking-[-0.04em] sm:text-4xl lg:text-5xl text-stone-100">{title}</h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition-colors hover:text-amber-200"
        >
          <span>{action.label}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </motion.div>
  );
}

function CapabilityHorizontalCard({ capability }: { capability: typeof CAPABILITIES[number] }) {
  const Icon = capability.icon;
  return (
    <motion.article
      variants={fadeInUp}
      className="group relative flex min-h-[260px] flex-col justify-between rounded-2xl border border-amber-900/20 bg-stone-900/20 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-700/40 hover:bg-stone-900/40 hover:shadow-2xl hover:shadow-amber-950/20"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-amber-400">{capability.number}</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-700/30 bg-amber-950/30 text-amber-400">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <h3 className="mt-6 text-xl font-medium text-stone-100">{capability.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-400 font-light">{capability.text}</p>
      </div>
      <div className="mt-8 border-t border-amber-900/20 pt-4 font-mono text-3xs uppercase tracking-[0.18em] text-stone-500">
        {capability.tag}
      </div>
    </motion.article>
  );
}

function HorizontalProjectRow({
  project,
  index,
}: {
  project: (typeof PROJECTS_DATA)[number];
  index: number;
}) {
  return (
    <div className="relative flex flex-col justify-between p-6 sm:p-8 md:flex-row md:items-center gap-6">
      <div className="flex items-start gap-5 sm:gap-6 md:items-center">
        <span className="font-mono text-sm font-bold text-amber-400">0{index}</span>
        <div>
          <span className="font-mono text-3xs font-semibold uppercase tracking-[0.18em] text-amber-500/90">
            {project.category}
          </span>
          <h3 className="mt-1 text-xl sm:text-2xl font-medium text-stone-100 transition-colors group-hover:text-amber-300">
            {project.title}
          </h3>
          <p className="mt-2 max-w-xl text-xs sm:text-sm text-stone-400 font-light line-clamp-2">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-amber-900/20 pt-4 md:border-t-0 md:pt-0 shrink-0">
        <div className="hidden flex-wrap items-center gap-2 font-mono text-3xs text-stone-400 lg:flex">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="rounded-md border border-amber-900/30 bg-stone-900/50 px-2.5 py-1 text-stone-300">
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-amber-800/40 bg-amber-950/30 px-5 text-xs font-medium text-stone-200 transition-all duration-300 group-hover:bg-amber-600 group-hover:text-stone-950 group-hover:border-amber-500"
        >
          <span>Case study</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function HorizontalOutcomesGrid({ outcomes }: { outcomes: typeof OUTCOMES }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
      {outcomes.map((item) => (
        <div
          key={item.label}
          className="group rounded-2xl border border-amber-900/20 bg-stone-900/20 p-6 transition-all duration-300 hover:border-amber-700/40 hover:bg-stone-900/40"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-2xs font-semibold text-amber-400">{item.num}</span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-950/40 border border-amber-700/30 text-amber-400">
              <Check className="h-3.5 w-3.5" />
            </div>
          </div>
          <h4 className="mt-4 text-base font-medium text-stone-100">{item.label}</h4>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-400 font-light">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

function InteractiveWorkstationWidget() {
  const [activeTab, setActiveTab] = useState("pipeline");

  return (
    <div className="relative w-full">
      <div className="absolute -inset-10 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
      <div className="relative overflow-hidden rounded-3xl border border-amber-800/30 bg-stone-950/80 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-amber-900/30 pb-4">
          <div className="flex items-center gap-2.5">
            <Command className="h-4 w-4 text-amber-400" />
            <span className="font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              Studio Workspace
            </span>
          </div>
          <span className="flex items-center gap-2 font-mono text-2xs text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" /> Live
          </span>
        </div>

        {/* Tab Controls */}
        <div className="mt-6 flex rounded-xl border border-amber-900/30 bg-stone-900/40 p-1">
          {SYSTEM_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg py-2 font-mono text-2xs transition-colors ${
                  isActive ? "text-amber-300 font-semibold" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-lg border border-amber-700/40 bg-amber-950/40 shadow-inner"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <Icon className="h-3.5 w-3.5" /> {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="min-h-[200px] py-6">
          <AnimatePresence mode="wait">
            {activeTab === "pipeline" && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="rounded-xl border border-amber-900/20 bg-stone-900/30 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-200">Workflow Execution</span>
                    <span className="font-mono text-2xs font-bold text-amber-400">84%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-800">
                    <div className="h-2 w-[84%] rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-amber-900/20 bg-stone-900/30 p-3.5">
                    <Database className="mb-2 h-4 w-4 text-amber-400" />
                    <p className="font-mono text-3xs uppercase text-stone-500">Core</p>
                    <p className="text-xs font-medium text-stone-200">Data APIs</p>
                  </div>
                  <div className="rounded-xl border border-amber-900/20 bg-stone-900/30 p-3.5">
                    <Sparkles className="mb-2 h-4 w-4 text-amber-300" />
                    <p className="font-mono text-3xs uppercase text-stone-500">UI/UX</p>
                    <p className="text-xs font-medium text-stone-200">Frontend</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "stack" && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 font-mono text-2xs"
              >
                {TECH_STACK_ITEMS.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-amber-900/20 bg-stone-900/30 px-4 py-2.5">
                    <span className="font-semibold text-stone-200">{item.name}</span>
                    <span className="text-3xs text-stone-400">{item.category}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "status" && (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2"
              >
                {SYSTEM_METRICS.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between rounded-xl border border-amber-900/20 bg-stone-900/30 px-4 py-2.5 text-xs">
                    <span className="text-stone-400">{metric.label}</span>
                    <span className="font-mono text-2xs font-semibold text-amber-400">{metric.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Footer */}
        <div className="border-t border-amber-900/30 pt-4 font-mono text-3xs text-stone-500 flex items-center justify-between">
          <span>Engineered for performance</span>
          <ChevronRight className="h-3.5 w-3.5 text-amber-400" />
        </div>
      </div>
    </div>
  );
}
