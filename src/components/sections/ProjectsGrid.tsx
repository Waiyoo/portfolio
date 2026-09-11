"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";

export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PROJECTS_DATA.map((project, index) => (
        <article
          key={project.id}
          className="group flex min-h-[380px] flex-col rounded-2xl border border-amber-900/30 bg-stone-950/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-700/50 hover:shadow-2xl shadow-xl"
        >
          {/* HEADER BADGES */}
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 font-mono text-3xs font-semibold uppercase tracking-wider text-amber-400">
              {project.category}
            </span>
            <span className="font-mono text-3xs font-bold text-stone-500">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </div>

          {/* CONTENT SECTION */}
          <div className="mt-8">
            <p className="text-3xs font-mono font-medium text-emerald-400 uppercase tracking-widest">
              {project.status === "PARTIALLY_COMPLETED" ? "In Development" : "Prototype"}
            </p>
            <h2 className="mt-2 text-xl font-sans font-bold text-stone-100 tracking-tight group-hover:text-amber-300 transition-colors">
              {project.title}
            </h2>
            <p className="mt-1 text-xs font-mono font-medium text-amber-400/90">
              {project.subtitle}
            </p>
            <p className="mt-4 text-xs font-sans text-stone-400 leading-relaxed font-light line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* FOOTER SECTION */}
          <div className="mt-auto pt-6">
            {/* TECHNOLOGIES */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-amber-900/20 bg-stone-900/40 px-2.5 py-1 font-mono text-3xs text-stone-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* METRIC & ACTION LINK */}
            <div className="mt-6 flex items-center justify-between border-t border-amber-900/20 pt-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-3xs text-stone-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                {project.metrics[0]?.value}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group/link"
              >
                <span>View case study</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}