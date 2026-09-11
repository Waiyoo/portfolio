import React from "react";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { CaseStudyStatus } from "@/data/caseStudies";

interface Props {
  status: CaseStudyStatus;
  statusNote: string;
}

export const StatusBanner: React.FC<Props> = ({ status, statusNote }) => {
  const getBannerConfig = () => {
    switch (status) {
      case "COMPLETED_PROTOTYPE":
        return {
          icon: CheckCircle2,
          title: "COMPLETED PROTOTYPE",
          border: "border-status-emerald/40",
          bg: "bg-emerald-950/30",
          text: "text-status-emerald",
        };
      case "PARTIALLY_COMPLETED":
        return {
          icon: Clock,
          title: "PARTIALLY COMPLETED",
          border: "border-status-amber/40",
          bg: "bg-amber-950/30",
          text: "text-status-amber",
        };
      default:
        return {
          icon: AlertTriangle,
          title: "IN DEVELOPMENT",
          border: "border-border-strong",
          bg: "bg-surface-inset",
          text: "text-text-secondary",
        };
    }
  };

  const config = getBannerConfig();
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded border ${config.border} ${config.bg} space-y-2 font-mono`}>
      <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${config.text}`}>
        <Icon className="h-4 w-4" />
        <span>Project Operational Status: {config.title}</span>
      </div>
      <p className="text-2xs text-text-secondary font-sans leading-relaxed">
        {statusNote}
      </p>
    </div>
  );
};