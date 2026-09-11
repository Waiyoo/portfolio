"use client";

import Link from "next/link";
import { FolderKanban, LayoutDashboard, Image, ExternalLink } from "lucide-react";

interface AdminSidebarProps {
  activeRoute?: string;
}

const navigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
];

export function AdminSidebar({ activeRoute = "/admin" }: AdminSidebarProps) {
  return (
    <aside className="w-64 min-h-screen border-r border-border bg-surface p-4">
      <div className="mb-8 border-b border-border pb-4">
        <div className="font-mono text-sm font-bold text-text-primary">
          RIITHIS
        </div>
        <div className="mt-1 font-mono text-2xs text-text-muted">
          ADMIN_CONSOLE
        </div>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = activeRoute === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded px-3 py-2 font-mono text-xs transition-colors ${
                active
                  ? "bg-brand text-brand-contrast"
                  : "text-text-secondary hover:bg-surface-inset hover:text-text-primary"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-border pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded px-3 py-2 font-mono text-xs text-text-muted hover:bg-surface-inset hover:text-text-primary"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Portfolio</span>
        </Link>
      </div>
    </aside>
  );
}
