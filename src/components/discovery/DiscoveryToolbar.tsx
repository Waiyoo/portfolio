"use client";

import React, { useState, useEffect } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface DiscoveryToolbarProps {
  categories: string[];
  technologies: string[];
  selectedCategory: string;
  selectedTech: string;
  searchQuery: string;
  selectedSort: string;
  onCategoryChange: (cat: string) => void;
  onTechChange: (tech: string) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: string) => void;
}

export const DiscoveryToolbar: React.FC<DiscoveryToolbarProps> = ({
  categories,
  technologies,
  selectedCategory,
  selectedTech,
  searchQuery,
  selectedSort,
  onCategoryChange,
  onTechChange,
  onSearchChange,
  onSortChange,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== searchQuery) onSearchChange(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, searchQuery, onSearchChange]);

  return (
    <div className="w-full bg-stone-950/80 border border-amber-900/30 rounded-2xl p-4 sm:p-5 mb-8 font-mono text-xs text-stone-200 backdrop-blur-xl shadow-2xl space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500/70" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search systems, tags, keywords..."
            className="w-full pl-10 pr-8 py-2.5 bg-stone-900/40 border border-amber-900/30 rounded-xl text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all font-sans text-xs"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                onSearchChange("");
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-400 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-3xs font-semibold text-amber-400/90 uppercase tracking-wider">
            <SlidersHorizontal className="h-3.5 w-3.5 text-amber-400" /> Filters:
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-stone-900/40 border border-amber-900/30 rounded-xl px-3.5 py-2.5 text-xs text-amber-200/90 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all font-sans"
          >
            <option value="ALL" className="bg-stone-950 text-stone-200">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c} className="bg-stone-950 text-stone-200">
                {c}
              </option>
            ))}
          </select>

          {/* Technology Filter */}
          <select
            value={selectedTech}
            onChange={(e) => onTechChange(e.target.value)}
            className="bg-stone-900/40 border border-amber-900/30 rounded-xl px-3.5 py-2.5 text-xs text-amber-200/90 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all font-sans"
          >
            <option value="ALL" className="bg-stone-950 text-stone-200">All Technologies</option>
            {technologies.map((t) => (
              <option key={t} value={t} className="bg-stone-950 text-stone-200">
                {t}
              </option>
            ))}
          </select>

          {/* Sort Order */}
          <div className="flex items-center gap-2 border-l border-amber-900/20 pl-3">
            <ArrowUpDown className="h-3.5 w-3.5 text-amber-500/70" />
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-stone-900/40 border border-amber-900/30 rounded-xl px-3.5 py-2.5 text-xs text-amber-200/90 focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all font-sans"
            >
              <option value="newest" className="bg-stone-950 text-stone-200">Newest First</option>
              <option value="oldest" className="bg-stone-950 text-stone-200">Oldest First</option>
              <option value="title_asc" className="bg-stone-950 text-stone-200">Title (A-Z)</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};