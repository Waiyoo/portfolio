"use client";

import React from "react";

interface FilterOption {
  id: string;
  label: string;
}

interface Props {
  categories: FilterOption[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const ProjectFilter: React.FC<Props> = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1.5 rounded border transition-colors ${
              isActive
                ? "bg-brand text-background border-brand font-semibold"
                : "bg-surface border-border text-text-secondary hover:border-brand/50"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
};