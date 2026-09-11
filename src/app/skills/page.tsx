import Link from "next/link";
import { Terminal, Cpu, Layers, Workflow, Smartphone, Boxes, Code2, ArrowRight } from "lucide-react";
import { SKILL_CATEGORIES, SKILLS_DATA } from "@/data/skills";

export const metadata = { 
  title: "Skills & Technical Capabilities", 
  description: "Technology and engineering capabilities behind Nickson Muriithi's software work." 
};

const CATEGORY_ICONS = {
  LANGUAGES: Code2,
  FRONTEND: Smartphone,
  BACKEND_APIS: Layers,
  TRADING_QUANT: Cpu,
  DATABASE_INFRA: Boxes,
  TOOLS_DEVOPS: Workflow,
};

export default function SkillsPage() {
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
            <span className="tracking-widest uppercase">SYS_CAPABILITIES // TOOLKIT</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-100 font-sans uppercase">
              Technology chosen with intent.
            </h1>
            <p className="text-base sm:text-lg text-stone-300/90 font-sans leading-relaxed">
              A practical toolkit for turning ambitious ideas into dependable products, platforms, and integrations under the RIITHIS consultancy brand.
            </p>
          </div>

          {/* Category Jump Pills */}
          <div className="pt-4 flex flex-wrap gap-2 font-mono text-xs">
            {SKILL_CATEGORIES.map((cat) => (
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
      {/* 2. SKILL CATEGORIES & DETAILS GRID                                 */}
      {/* ------------------------------------------------------------------- */}
      <section className="container space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const skills = SKILLS_DATA.filter((skill) => skill.category === category.id);
            const IconComponent = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS] || Code2;

            return (
              <article 
                key={category.id} 
                id={category.id}
                className="relative flex flex-col justify-between space-y-6 p-6 md:p-8 rounded-2xl border border-stone-800/80 bg-stone-900/60 backdrop-blur-md shadow-xl hover:border-amber-500/50 transition-all duration-300 overflow-hidden group scroll-mt-24"
              >
                {/* Ambient Card Top Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-5 relative z-10">
                  
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs text-amber-500 font-semibold uppercase tracking-wider">
                      <IconComponent className="h-4 w-4 text-amber-500" />
                      <span>{category.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-stone-400 border border-stone-800 bg-stone-950 px-2.5 py-1 rounded">
                      {skills.length} MODULES
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-mono text-xl font-bold text-stone-100 uppercase tracking-wide">
                      {category.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300/90 font-sans leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills Items List */}
                  <div className="space-y-3 pt-2">
                    {skills.map((skill) => (
                      <div 
                        key={skill.id} 
                        className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-1.5 shadow-inner hover:border-stone-700 transition-colors"
                      >
                        <h3 className="font-mono text-sm font-bold text-stone-100 tracking-wide">
                          {skill.name}
                        </h3>
                        <p className="text-xs text-stone-300/90 font-sans leading-relaxed">
                          {skill.roleDescription}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>

              </article>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. CALL TO ACTION SECTION                                          */}
      {/* ------------------------------------------------------------------- */}
      <section className="container pt-6">
        <div className="relative p-8 md:p-12 rounded-2xl border border-stone-800/80 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="space-y-2.5 text-center md:text-left relative z-10">
            <h2 className="font-mono text-2xl sm:text-3xl font-bold text-stone-100 uppercase tracking-wide">
              Ready to leverage this stack?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-sans max-w-xl leading-relaxed">
              Discuss your project requirements or utilize the guided estimator to structure your system architecture.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-3 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}