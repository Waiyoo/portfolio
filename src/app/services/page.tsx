import Link from "next/link";
import { 
  Terminal, 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Database, 
  Smartphone, 
  Boxes,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
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
    <div className="flex flex-col space-y-16 pb-16">
      
      {/* ------------------------------------------------------------------- */}
      {/* 1. PAGE HEADER                                                       */}
      {/* ------------------------------------------------------------------- */}
      <section className="pt-12 md:pt-16 border-b border-border bg-surface/30">
        <div className="container flex flex-col space-y-6 pb-12">
          
          <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1 font-mono text-2xs text-brand w-fit">
            <Terminal className="h-3.5 w-3.5" />
            <span>SYSTEM_CAPABILITIES // SERVICE_DIRECTORY</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary font-sans">
              Engineering Services & Deliverables
            </h1>
            <p className="text-base sm:text-lg text-text-secondary font-sans leading-relaxed">
              Targeted software engineering services focused on custom systems development, mobile platforms, payment integration, workflow automation, and quantitative logic.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-2 font-mono text-2xs">
            {SERVICE_CATEGORIES.map((cat) => (
              <a 
                key={cat.id} 
                href={`#${cat.id}`}
                className="px-3 py-1 rounded border border-border bg-surface hover:border-brand/50 text-text-secondary transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. SERVICES CATEGORIES & DETAIL                                      */}
      {/* ------------------------------------------------------------------- */}
      <section className="container space-y-20">
        {SERVICE_CATEGORIES.map((cat) => {
          const categoryServices = SERVICES_DATA.filter((s) => s.category === cat.id);
          const IconComponent = CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS] || Code2;

          return (
            <div key={cat.id} id={cat.id} className="space-y-8 scroll-mt-20">
              
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-label">
                    <IconComponent className="h-4 w-4 text-brand" />
                    <span>{cat.label}</span>
                  </div>
                  <h2 className="text-h2">{cat.title}</h2>
                </div>
                <Badge status="info">{categoryServices.length} OFFERINGS</Badge>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categoryServices.map((service) => (
                  <Card key={service.id} className="flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-4">
                      {/* Title & Short Description */}
                      <div>
                        <h3 className="text-lg font-bold text-text-primary font-sans">{service.title}</h3>
                        <p className="text-xs text-text-secondary font-sans mt-1 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Problem Domain */}
                      <div className="p-3 rounded bg-surface-inset border border-border-subtle space-y-1">
                        <span className="font-mono text-2xs font-semibold text-brand uppercase tracking-wider block">
                          Problem Domain Solved
                        </span>
                        <p className="text-xs text-text-secondary font-sans leading-relaxed">
                          {service.problemSolved}
                        </p>
                      </div>

                      {/* Key Engineering Deliverables */}
                      <div className="space-y-2">
                        <span className="font-mono text-2xs font-semibold text-text-primary uppercase tracking-wider block">
                          Technical Deliverables
                        </span>
                        <ul className="space-y-1.5 text-xs text-text-secondary font-sans">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-status-emerald shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* System Integration Role */}
                      <div className="pt-2 border-t border-border-subtle">
                        <span className="font-mono text-2xs font-semibold text-text-muted uppercase tracking-wider block mb-1">
                          System Capability Context
                        </span>
                        <p className="text-2xs text-text-muted font-sans leading-relaxed">
                          {service.systemIntegrationNote}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Footer */}
                    <div className="pt-4 border-t border-border flex flex-wrap gap-1.5">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="font-mono text-2xs px-2 py-0.5 rounded bg-surface-hover border border-border text-text-secondary">
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
      {/* 3. CALL TO ACTION                                                   */}
      {/* ------------------------------------------------------------------- */}
      <section className="container pt-8">
        <div className="p-8 md:p-12 rounded border border-border bg-gradient-to-r from-surface via-surface-hover to-surface flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-sans">
              Have a system in mind?
            </h2>
            <p className="text-sm text-text-secondary font-sans max-w-xl">
              Accepting custom software development projects, mobile application development, payment integrations, and quantitative logic engines.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="accent" size="lg" className="font-mono text-xs sm:text-sm" asChild>
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
