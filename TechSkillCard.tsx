import React from "react";
import Link from "next/link";
import { ArrowUpRight, GitCommit } from "lucide-react";
import { SkillItem } from "@/data/skills";

interface Props {
  skill: SkillItem;
}

export const TechSkillCard: React.FC<Props> = ({ skill }) => {
  return (
    <div className="p-5 rounded border border-border bg-surface flex flex-col justify-between space-y-4 hover:border-brand/40 transition-colors">
      
      {/* Skill Name & Role Description */}
      <div className="space-y-2">
        <h3 className="text-base font-bold text-text-primary font-sans">{skill.name}</h3>
        <p className="text-xs text-text-secondary leading-relaxed font-sans">
          {skill.roleDescription}
        </p>
      </div>

      {/* Applied System Relationships */}
      <div className="pt-3 border-t border-border-subtle space-y-2 font-mono">
        <span className="text-3xs text-text-muted uppercase tracking-wider block">
          APPLIED_SYSTEM_RELATIONSHIPS
        </span>
        <ul className="space-y-1.5 text-2xs">
          {skill.relatedProjects.map((proj) => (
            <li key={proj.slug} className="flex items-center justify-between group">
              <Link 
                href={`/projects/${proj.slug}`}
                className="flex items-center gap-1.5 text-brand hover:underline font-medium"
              >
                <GitCommit className="h-3 w-3 shrink-0" />
                <span>{proj.title}</span>
                <ArrowUpRight className="h-2.5 w-2.5 opacity-60 group-hover:opacity-100" />
              </Link>
              <span className="text-text-muted text-3xs truncate max-w-[150px]">
                {proj.context}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
