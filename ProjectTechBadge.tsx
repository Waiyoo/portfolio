import React from "react";

interface Props {
  tech: string;
}

export const ProjectTechBadge: React.FC<Props> = ({ tech }) => (
  <span className="font-mono text-2xs px-2 py-0.5 rounded bg-surface-hover border border-border text-text-secondary">
    {tech}
  </span>
);
