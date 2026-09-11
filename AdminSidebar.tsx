import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Layers, 
  Wrench, 
  Cpu, 
  Inbox, 
  Settings, 
  LogOut, 
  Terminal 
} from "lucide-react";

export const AdminSidebar = ({ activeRoute }: { activeRoute: string }) => {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Services", href: "/admin/services", icon: Layers },
    { label: "Skills Mapper", href: "/admin/skills", icon: Wrench },
    { label: "Technologies", href: "/admin/technologies", icon: Cpu },
    { label: "Inquiries Inbox", href: "/admin/inquiries", icon: Inbox },
    { label: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between h-screen sticky top-0 font-mono text-xs text-text-secondary p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-2 border-b border-border pb-3 text-brand">
          <Terminal className="h-5 w-5" />
          <span className="font-bold text-sm tracking-wider text-text-primary">RIITHIS_ADMIN</span>
        </div>

        {/* Nav links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  isActive 
                    ? "bg-brand/10 text-brand font-bold border border-brand/20" 
                    : "hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="pt-4 border-t border-border">
        <Link
          href="/admin/login"
          className="flex items-center gap-2 text-status-rose hover:underline px-3 py-2 text-2xs font-bold"
        >
          <LogOut className="h-4 w-4" />
          <span>TERMINATE_SESSION</span>
        </Link>
      </div>
    </aside>
  );
};