import Link from "next/link";
import { 
  Terminal, 
  Cpu, 
  Workflow, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  Code2, 
  Boxes, 
  ShieldCheck,
  GitCommit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = {
  title: "About",
  description: "Software Developer specializing in software systems, full-stack architecture, APIs, integrations, and quantitative engines.",
};

// Technical Focus Areas
const FOCUS_AREAS = [
  {
    icon: Boxes,
    title: "Software Systems",
    description: "Designing structured software architectures built around complex business logic, explicit system boundaries, and maintainable data models.",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Engineering reliable web and mobile applications using modern runtimes, typed interfaces, state management, and optimized user flows.",
  },
  {
    icon: Layers,
    title: "APIs & Integration",
    description: "Building robust HTTP and WebSocket interfaces, integrating third-party gateways (e.g., M-Pesa Daraja), and orchestrating microservices.",
  },
  {
    icon: Database,
    title: "Data-Driven Applications",
    description: "Structuring relational and document databases, handling high-throughput event processing, and visualizing data streams effectively.",
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    description: "Digitizing manual workflows, automating service booking flows, inventory pipelines, and internal administrative operations.",
  },
  {
    icon: Cpu,
    title: "Quantitative Systems",
    description: "Developing algorithmic strategy engines, market data processing routines, and API connectors for platforms like MetaTrader 5.",
  },
];

// Engineering Lifecycle Sequence
const WORKFLOW_STEPS = [
  {
    step: "01",
    phase: "UNDERSTAND",
    title: "Domain Analysis & Constraints",
    description: "Deconstructing core requirements, data flows, operational constraints, and integration touchpoints before designing solutions.",
  },
  {
    step: "02",
    phase: "DESIGN",
    title: "Architecture & Schema Definition",
    description: "Drafting API contracts, database schemas, state-machines, and structural component hierarchies.",
  },
  {
    step: "03",
    phase: "BUILD",
    title: "Modular Implementation",
    description: "Writing clean, type-safe, modular code across client and server runtimes adhering to predictable software patterns.",
  },
  {
    step: "04",
    phase: "INTEGRATE",
    title: "Gateway & Service Connection",
    description: "Wiring payment processors, external trading APIs, webhooks, and third-party services into unified workflows.",
  },
  {
    step: "05",
    phase: "TEST",
    title: "Validation & Edge Verification",
    description: "Verifying endpoint contracts, edge-case failure modes, error responses, and user interface reliability under load.",
  },
  {
    step: "06",
    phase: "IMPROVE",
    title: "Refinement & Optimization",
    description: "Analyzing operational performance, tuning query execution times, refining user interface density, and iterating codebases.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col space-y-16 pb-20 bg-[#0C0A09] text-stone-200 selection:bg-amber-800/40 selection:text-amber-100 font-sans antialiased">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. PAGE HEADER / POSITIONING                                        */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative border-b border-amber-950/40 bg-gradient-to-b from-stone-900/40 via-stone-950/30 to-[#0C0A09] pt-12 md:pt-20 pb-12">
        {/* Background Radial Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-amber-600/10 blur-[120px]" />
        </div>

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col space-y-6">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-800/30 bg-amber-950/20 px-3.5 py-1.5 font-mono text-2xs text-amber-400 w-fit backdrop-blur-xl shadow-lg">
            <Terminal className="h-3.5 w-3.5 text-amber-400" />
            <span className="uppercase tracking-widest font-semibold">SYSTEM_PROFILE // ABOUT_DEVELOPER</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-stone-100">
              Nickson Muriithi
            </h1>
            <p className="text-base sm:text-lg text-stone-400 font-light leading-relaxed">
              Software Developer engineering tailored software systems, full-stack applications, and algorithmic data pipelines designed for operational reliability.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap gap-6 border-t border-amber-950/40 text-xs font-mono text-stone-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Modular Software Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-amber-500" />
              <span>API & Webhook Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-amber-300" />
              <span>Quantitative Analysis Engines</span>
            </div>
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. TECHNICAL FOCUS AREAS                                            */}
      {/* ------------------------------------------------------------------- */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <Layers className="h-4 w-4 text-amber-400" />
            <span>TECHNICAL_COMPETENCIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-100">Core Technical Focus</h2>
          <p className="text-sm text-stone-400 max-w-xl font-light">
            Specialized engineering domains spanning custom client interfaces, backend servers, and algorithmic logic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FOCUS_AREAS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card 
                key={idx} 
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-amber-900/20 bg-stone-900/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-700/40 hover:bg-stone-900/40 hover:shadow-2xl hover:shadow-amber-950/20"
              >
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-xl border border-amber-700/30 bg-amber-950/30 flex items-center justify-center text-amber-400 transition-colors group-hover:border-amber-600/50 group-hover:bg-amber-900/40">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-medium text-stone-100 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed text-stone-400 font-light">
                    {item.description}
                  </CardDescription>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. ENGINEERING METHODOLOGY & LIFECYCLE                              */}
      {/* ------------------------------------------------------------------- */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-2xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            <Workflow className="h-4 w-4 text-amber-400" />
            <span>EXECUTION_FRAMEWORK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-stone-100">The Engineering Approach</h2>
          <p className="text-sm text-stone-400 max-w-xl font-light">
            A systematic, predictable lifecycle applied to every software project from inception to production refinement.
          </p>
        </div>

        {/* Phase Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORKFLOW_STEPS.map((phase) => (
            <div 
              key={phase.step} 
              className="p-6 rounded-2xl border border-amber-900/20 bg-stone-900/20 flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-amber-700/40 hover:bg-stone-900/40"
            >
              <div className="flex items-center justify-between border-b border-amber-900/20 pb-3">
                <span className="font-mono text-xs font-bold text-amber-400">{phase.phase}</span>
                <span className="font-mono text-2xs text-stone-500">{phase.step} / 06</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-stone-100">{phase.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed font-light">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. ARCHITECTURAL VALUES & STANDARDS                                 */}
      {/* ------------------------------------------------------------------- */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl border border-amber-800/30 bg-stone-950/80 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-medium text-stone-100">Engineering Principles</h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-2xl">
              Core technical guidelines governing code maintainability, system resilience, and structural design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/30 space-y-2 transition-colors hover:border-amber-800/40">
              <div className="flex items-center gap-2.5 font-mono text-stone-200 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Explicit API Boundaries</span>
              </div>
              <p className="text-stone-400 leading-relaxed text-2xs font-light">
                Designing strictly typed data structures and predictable JSON responses to decouple frontend presentation from backend logic.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/30 space-y-2 transition-colors hover:border-amber-800/40">
              <div className="flex items-center gap-2.5 font-mono text-stone-200 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Pragmatic Stack Selection</span>
              </div>
              <p className="text-stone-400 leading-relaxed text-2xs font-light">
                Selecting runtimes and libraries based on ecosystem maturity, performance profiles, and problem alignment rather than industry trends.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/30 space-y-2 transition-colors hover:border-amber-800/40">
              <div className="flex items-center gap-2.5 font-mono text-stone-200 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Local & External System Readiness</span>
              </div>
              <p className="text-stone-400 leading-relaxed text-2xs font-light">
                Factoring in region-specific infrastructure such as M-Pesa payment gateways, SMS notification channels, and currency processing.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-amber-900/20 bg-stone-900/30 space-y-2 transition-colors hover:border-amber-800/40">
              <div className="flex items-center gap-2.5 font-mono text-stone-200 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Transparent System Statuses</span>
              </div>
              <p className="text-stone-400 leading-relaxed text-2xs font-light">
                Clearly documenting software state, implementation scope, and architectural trade-offs across all client and internal projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. NAVIGATION & CTAS                                                */}
      {/* ------------------------------------------------------------------- */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl border border-amber-800/30 bg-gradient-to-br from-amber-950/60 via-stone-900/80 to-stone-950 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left backdrop-blur-xl shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-medium text-stone-100">
              Explore Engineered Projects & Case Studies
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 font-light max-w-md">
              Examine detailed system breakdowns, data flow architectures, and technical trade-offs across implemented applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Button size="md" className="rounded-full bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-stone-100 hover:shadow-amber-900/60 border border-amber-600/30 font-mono text-xs px-6 py-2.5 h-auto" asChild>
              <Link href="/projects" className="flex items-center gap-2">
                <span>EXPLORE_PROJECTS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="md" className="rounded-full border border-amber-900/40 bg-stone-900/50 text-stone-300 hover:bg-stone-900/80 hover:text-white font-mono text-xs px-6 py-2.5 h-auto" asChild>
              <Link href="/contact">INITIATE_CONTACT</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}