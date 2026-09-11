import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Layers3, Terminal } from "lucide-react";
import { getProjectBySlug, PROJECTS_DATA } from "@/data/projects";

export function generateStaticParams() {
  return PROJECTS_DATA.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="flex flex-col space-y-12 pb-24">
      {/* ------------------------------------------------------------------- */}
      {/* 1. PROJECT HERO SECTION                                            */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-12 md:pt-16 border-b border-stone-800/80 bg-stone-900/40 backdrop-blur-md overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="container py-12 sm:py-16 flex flex-col space-y-6 relative z-10">
          {/* Back Navigation Telemetry */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-stone-400 transition-colors hover:text-amber-400 w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>SYS_DIRECTORY // ALL_WORK</span>
          </Link>

          {/* Category Tag */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-stone-800 bg-stone-950/80 px-3 py-1.5 font-mono text-[11px] text-amber-500 w-fit shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span className="tracking-widest uppercase">SYS_CASE_STUDY :: {project.category}</span>
          </div>

          <h1 className="max-w-4xl font-mono text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-100 uppercase">
            {project.title}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-stone-300/90 font-sans leading-relaxed">
            {project.summary}
          </p>

          {/* Technology Badges */}
          <div className="pt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2.5 py-1 rounded bg-stone-950/90 border border-stone-800 text-stone-300 hover:border-stone-700 hover:text-amber-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. PROJECT METRICS TELEMETRY GRID                                  */}
      {/* ------------------------------------------------------------------- */}
      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="relative p-5 rounded-xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md shadow-lg space-y-2 group hover:border-amber-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber-500/90 font-semibold">
                SYS_METRIC :: {metric.label}
              </p>
              <p className="font-mono text-xl sm:text-2xl font-bold text-stone-100">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. CORE CHALLENGE & SOLUTION ARCHITECTURE                          */}
      {/* ------------------------------------------------------------------- */}
      <section className="container grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        {/* Main Problem / Solution Breakdown */}
        <div className="rounded-2xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md p-7 sm:p-9 space-y-8 shadow-xl">
          <div className="space-y-3">
            <span className="font-mono text-[10px] font-semibold text-amber-500 uppercase tracking-widest block">
              SYS_CHALLENGE :: PROBLEM_STATEMENT
            </span>
            <p className="text-lg sm:text-xl font-sans font-medium text-stone-100 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-stone-800/80">
            <span className="font-mono text-[10px] font-semibold text-emerald-400 uppercase tracking-widest block">
              SYS_SOLUTION :: ARCHITECTURAL_OVERVIEW
            </span>
            <p className="text-sm sm:text-base font-sans text-stone-300/90 leading-relaxed">
              {project.architecturalOverview}
            </p>
          </div>
        </div>

        {/* Sidebar Key Capabilities */}
        <aside className="rounded-2xl border border-stone-800/80 bg-stone-950/85 backdrop-blur-md p-7 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 font-mono text-xs text-amber-500 font-semibold uppercase tracking-wider">
              <Layers3 className="h-4 w-4 text-amber-500" />
              <span>Key Capabilities</span>
            </div>

            <h2 className="font-mono text-lg font-bold text-stone-100 uppercase tracking-wide">
              System Highlights
            </h2>

            <ul className="space-y-3.5">
              {project.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-stone-300/90 font-sans">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-stone-800/80">
            <div className="flex items-center gap-2 font-mono text-[10px] text-stone-500 uppercase">
              <Terminal className="h-3 w-3 text-amber-500/80" />
              <span>STATUS: PRODUCTION_VERIFIED</span>
            </div>
          </div>
        </aside>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. STUDIO CALL TO ACTION BANNER                                    */}
      {/* ------------------------------------------------------------------- */}
      <section className="container pt-6">
        <div className="relative p-8 md:p-12 rounded-2xl border border-stone-800/80 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="space-y-2.5 text-center md:text-left relative z-10">
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-amber-500 font-semibold block">
              Have a similar challenge?
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-stone-100 uppercase tracking-wide">
              Let&apos;s make it work for your business.
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3.5 font-mono text-xs sm:text-sm font-semibold text-stone-950 uppercase tracking-wider shadow-lg transition-all duration-200"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}