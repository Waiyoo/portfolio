import React from "react";
import { Terminal, Code, Cpu, Workflow } from "lucide-react";

interface Props {
  title: string;
  previewType: "code" | "architecture" | "workflow";
  snippet?: string;
}

export const ProjectPreview: React.FC<Props> = ({ title, previewType, snippet }) => {
  const getIcon = () => {
    switch (previewType) {
      case "code": return Code;
      case "architecture": return Cpu;
      case "workflow": return Workflow;
      default: return Terminal;
    }
  };

  const Icon = getIcon();

  return (
    <div className="w-full rounded border border-border bg-surface-inset overflow-hidden">
      {/* Visual Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-surface text-2xs font-mono text-text-muted">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-brand" />
          <span>{title.toLowerCase().replace(/\s+/g, "_")}_spec</span>
        </div>
        <span className="text-2xs text-text-muted uppercase">{previewType}</span>
      </div>

      {/* Code / Architecture Snippet Representation */}
      <div className="p-3 font-mono text-2xs text-text-secondary bg-surface-inset/80 overflow-x-auto whitespace-pre leading-relaxed">
        {snippet || "// Architectural blueprint verified."}
      </div>
    </div>
  );
};
