import Link from "next/link";
import { 
  Terminal, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Smartphone, 
  Boxes,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICES_DATA, SERVICE_CATEGORIES } from "@/data/services";

export const metadata = {
  title: "Services",
  description: "Custom software systems, web & mobile applications, APIs, business automation, and quantitative engines built by Nickson Muriithi.",
};

const CATEGORY_ICONS = {
  CUSTOM_SOFTWARE: Boxes,
  WEB_MOBILE: Smartphone,
  APIS_INTEGRATIONS: Layers,
  BUSINESS_SYSTEMS: Workflow,
  DATA_QUANT: Cpu,
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col space-y-16 pb-20">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. PAGE HEADER & TELEMETRY NAV                                     */}
      {/* ------------------------------------------------------------------- */}
      <section className="relative pt-12 md:pt-16 border-b border-stone-800/80 bg-stone-900/40 backdrop-blur-md overflow-hidden">
        {/* Ambient Top Spotlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="container flex flex-col space-y-6 pb-12 relative z-10">
          
          {/* Telemetry Badge */}
          <div className="inline-flex items-center gap-2 rounded-lg border border-stone-800 bg-stone-950/80 px-3 py-1.5 font-mono text-[11px] text-amber-500 w-fit shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <Terminal className="h-3.5 w-3.5 text-amber-500" />
            <span className="tracking-widest uppercase">SYS_CAPABILITIES // SERVICE_DIRECTORY</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-100 font-sans">
              Engineering Services & Deliverables
            </h1>
            <p className="text-base sm:text-lg text-stone-300/90 font-sans leading-relaxed">
              Targeted software engineering services focused on custom systems development, mobile platforms, payment integration, workflow automation, and quantitative logic.
            </p>
          </div>

          {/* Category Jump Pills */}
          <div className="pt-4 flex flex-wrap gap-2 font-mono text-xs">
            {SERVICE_CATEGORIES.map((cat) => (
              <a 
                key={cat.id} 
                href={`#${cat.id}`}
                className="px-3.5 py-1.5 rounded-lg border border-stone-800/80 bg-stone-950/80 hover:border-amber-500/50 hover:text-amber-400 text-stone-300 transition-all duration-200 shadow-sm"
              >
                {cat.title}
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. SERVICES CATEGORIES & DETAIL GRID                               */}
      {/* ------------------------------------------------------------------- */}
      <section className="container space-y-24">
        {SERVICE_CATEGORIES.map((cat) => {
          const categoryServices = SERVICES_DATA.filter((s) => s.category === cat.id);
          const IconComponent = CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS] || Code2;

          return (
            <div key={cat.id} id={cat.id} className="space-y-8 scroll-mt-24">
              
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-amber-500 font-semibold uppercase tracking-wider">
                    <IconComponent className="h-4 w-4 text-amber-500" />
                    <span>{cat.label}</span>
                  </div>
                  <h2 className="font-mono text-xl md:text-2xl font-bold text-stone-100 uppercase tracking-wide">{cat.title}</h2>
                </div>
                <Badge className="font-mono text-[10px] text-stone-400 border-stone-800 bg-stone-950 px-3 py-1">
                  {categoryServices.length} OFFERINGS
                </Badge>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categoryServices.map((service) => (
                  <Card 
                    key={service.id} 
                    className="relative flex flex-col justify-between space-y-6 p-6 md:p-8 rounded-xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md shadow-xl hover:border-amber-500/50 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Ambient Card Top Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="space-y-5 relative z-10">
                      {/* Title & Short Description */}
                      <div className="space-y-2">
                        <h3 className="font-mono text-base md:text-lg font-bold text-stone-100 uppercase tracking-wide">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-300/90 font-sans leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Problem Domain Box */}
                      <div className="p-4 rounded-lg bg-stone-950/80 border border-stone-800/80 space-y-1.5 shadow-inner">
                        <span className="font-mono text-[10px] font-semibold text-amber-500 uppercase tracking-widest block">
                          SYS_PROBLEM :: DOMAIN_SOLVED
                        </span>
                        <p className="text-xs text-stone-300 font-sans leading-relaxed">
                          {service.problemSolved}
                        </p>
                      </div>

                      {/* Key Engineering Deliverables */}
                      <div className="space-y-2.5">
                        <span className="font-mono text-[10px] font-semibold text-stone-200 uppercase tracking-widest block">
                          Technical Deliverables
                        </span>
                        <ul className="space-y-2 text-xs text-stone-300/90 font-sans">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* System Integration Role */}
                      <div className="pt-3 border-t border-stone-800/80">
                        <span className="font-mono text-[10px] font-semibold text-stone-500 uppercase tracking-widest block mb-1">
                          System Capability Context
                        </span>
                        <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
                          {service.systemIntegrationNote}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Footer */}
                    <div className="pt-4 border-t border-stone-800/80 flex flex-wrap gap-1.5 relative z-10">
                      {service.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="font-mono text-[10px] px-2.5 py-1 rounded bg-stone-950/90 border border-stone-800 text-stone-300 hover:border-stone-700 hover:text-amber-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                  </Card>
                ))}
              </div>

            </div>
          );
        })}
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. CALL TO ACTION SECTION                                          */}
      {/* ------------------------------------------------------------------- */}
      <section className="container pt-10">
        <div className="relative p-8 md:p-12 rounded-2xl border border-stone-800/80 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="space-y-2.5 text-center md:text-left relative z-10">
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-stone-100 uppercase tracking-wide">
              Have a system in mind?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-xl leading-relaxed">
              Accepting custom software development projects, mobile application development, payment integrations, and quantitative logic engines.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <Button 
              variant="accent" 
              size="lg" 
              className="font-mono text-xs sm:text-sm uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold gap-2 shadow-lg transition-all duration-200" 
              asChild
            >
              <Link href="/start-project" className="flex items-center gap-2">
                <span>Let's Build Something</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}