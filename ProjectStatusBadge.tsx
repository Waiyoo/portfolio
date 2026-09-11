import React from "react";
import { ProjectStatus } from "@/data/projects";

interface Props {
  status: ProjectStatus;
  className?: string;
}

export const ProjectStatusBadge: React.FC<Props> = ({ status, className = "" }) => {
  const isPrototype = status === "COMPLETED_PROTOTYPE";
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-2xs font-mono font-medium border ${
        isPrototype
          ? "bg-emerald-950/40 border-status-emerald/30 text-status-emerald"
          : "bg-amber-950/40 border-status-amber/30 text-status-amber"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isPrototype ? "bg-status-emerald" : "bg-status-amber"
        }`}
      />
      {isPrototype ? "PROTOTYPE" : "IN_DEVELOPMENT"}
    </span>
  );
};