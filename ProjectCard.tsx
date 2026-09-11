import React from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectItem } from "@/data/projects";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectTechBadge } from "./ProjectTechBadge";
import { ProjectPreview } from "./ProjectPreview";

interface Props {
  project: ProjectItem;
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <Card className="flex flex-col justify-between h-full hover:border-brand/50 transition-colors space-y-6">
      <div className="space-y-4">
        
        {/* Category & Status Badge Header */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-2xs text-text-muted uppercase tracking-wider">
            {project.category}
          </span>
          <ProjectStatusBadge status={project.status} />
        </div>

        {/* Title & Subtitle */}
        <div>
          <h3 className="text-xl font-bold text-text-primary font-sans">{project.title}</h3>
          <p className="font-mono text-2xs text-brand mt-0.5">{project.subtitle}</p>
        </div>

        {/* Dynamic Architectural Preview Component */}
        <ProjectPreview 
          title={project.title} 
          previewType={project.previewType} 
          snippet={project.previewSnippet} 
        />

        {/* Summary Description */}
        <p className="text-xs text-text-secondary leading-relaxed font-sans">
          {project.summary}
        </p>

        {/* System Commercial Note */}
        <div className="p-2.5 rounded bg-surface-inset border border-border-subtle text-2xs font-mono text-text-muted">
          <span className="text-text-secondary font-semibold">Status Note: </span>
          {project.statusNote}
        </div>

        {/* Technology Stack Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <ProjectTechBadge key={tech} tech={tech} />
          ))}
        </div>

      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-border-subtle">
        <Button variant="secondary" size="sm" className="w-full font-mono text-xs flex items-center justify-between" asChild>
          <Link href={`/projects/${project.slug}`}>
            <span>VIEW_CASE_STUDY</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};