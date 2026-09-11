"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api.client";
import { ProjectImage } from "@/components/ui/ProjectImage";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";

interface RelatedProjectsProps {
  currentProjectId: string;
}

export const RelatedProjects: React.FC<RelatedProjectsProps> = ({ currentProjectId }) => {
  const { data: related } = useQuery({
    queryKey: ["projects", "related", currentProjectId],
    queryFn: () => apiClient.get<any[]>(`/projects/${currentProjectId}/related`),
    staleTime: 1000 * 60 * 10,
  });

  if (!related || related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-amber-900/30 pt-12 text-stone-200">
      
      {/* SECTION HEADER */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-amber-400" />
          <h3 className="text-base font-mono font-bold text-stone-100 tracking-wider uppercase">
            RELATED_SYSTEMS
          </h3>
        </div>
        <p className="text-xs font-mono text-stone-400 font-light">
          Architecturally similar projects and case studies
        </p>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((project) => (
          <article
            key={project.id}
            className="bg-stone-950/80 border border-amber-900/30 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-700/50 backdrop-blur-xl transition-all duration-300 shadow-xl group"
          >
            <div>
              <ProjectImage
                src={project.media?.[0]?.url}
                alt={project.title}
                title={project.title}
                category={project.category}
                aspectRatio="16/9"
                className="mb-3.5 rounded-xl overflow-hidden border border-amber-900/20"
              />
              <div className="text-3xs font-mono font-semibold uppercase tracking-wider text-amber-400/90">
                {project.category}
              </div>
              <h4 className="text-sm font-semibold text-stone-100 mt-1 font-sans group-hover:text-amber-300 transition-colors">
                {project.title}
              </h4>
              <p className="text-xs text-stone-400 font-sans font-light mt-1.5 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors group/link"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </Link>
          </article>
        ))}
      </div>

    </section>
  );
};