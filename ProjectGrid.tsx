"use client";

import React, { useState } from "react";
import { ProjectItem } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilter } from "./ProjectFilter";

interface Props {
  initialProjects: ProjectItem[];
}

const FILTER_OPTIONS = [
  { id: "all", label: "ALL_SYSTEMS" },
  { id: "mobile-commerce", label: "MOBILE_COMMERCE" },
  { id: "quant-systems", label: "QUANT_SYSTEMS" },
  { id: "business-automation", label: "BUSINESS_AUTOMATION" },
];

export const ProjectGrid: React.FC<Props> = ({ initialProjects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = selectedCategory === "all"
    ? initialProjects
    : initialProjects.filter((p) => p.categoryId === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Controls */}
      <ProjectFilter 
        categories={FILTER_OPTIONS}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Dynamic Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};