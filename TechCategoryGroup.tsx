import React from "react";
import { SkillCategory, SkillItem } from "@/data/skills";
import { TechSkillCard } from "./TechSkillCard";

interface Props {
  category: SkillCategory;
  skills: SkillItem[];
}

export const TechCategoryGroup: React.FC<Props> = ({ category, skills }) => {
  return (
    <div className="space-y-4">
      
      {/* Category Header */}
      <div className="border-b border-border pb-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xs text-brand uppercase tracking-wider">{category.label}</span>
          <span className="font-mono text-3xs text-text-muted">{skills.length} TECHNOLOGIES</span>
        </div>
        <h2 className="text-xl font-bold text-text-primary font-sans">{category.title}</h2>
        <p className="text-xs text-text-secondary font-sans">{category.description}</p>
      </div>

      {/* Grid of Skills for this Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <TechSkillCard key={skill.id} skill={skill} />
        ))}
      </div>

    </div>
  );
};