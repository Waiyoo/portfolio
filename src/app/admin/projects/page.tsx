// src/app/admin/projects/page.tsx
import { projectsStore } from "@/lib/store/adminStore";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Edit, Eye, FolderKanban } from "lucide-react";

export default function AdminProjectsPage() {
  return (
    <div className="flex min-h-screen bg-surface-inset">
      <AdminSidebar activeRoute="/admin/projects" />

      <main className="flex-1 p-8 space-y-6 font-sans">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Project Management</h1>
            <p className="text-xs text-text-secondary font-mono">Full CRUD & Status Controls</p>
          </div>
          <Link
            href="/admin/projects/new"
            className="py-2 px-4 rounded bg-brand text-brand-contrast font-mono text-xs font-bold hover:bg-brand/90"
          >
            + NEW_PROJECT
          </Link>
        </div>

        {/* PROJECTS TABLE */}
        <div className="rounded border border-border bg-surface overflow-hidden">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-surface-inset border-b border-border text-2xs text-text-muted uppercase">
              <tr>
                <th className="p-3">Title / Slug</th>
                <th className="p-3">Category</th>
                <th className="p-3">Pub. Status</th>
                <th className="p-3">Op. Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {projectsStore.map((p) => (
                <tr key={p.id} className="hover:bg-surface-hover">
                  <td className="p-3">
                    <div className="font-bold text-text-primary">{p.title}</div>
                    <div className="text-3xs text-text-muted">{p.slug}</div>
                  </td>
                  <td className="p-3 text-text-secondary">{p.category}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-3xs font-bold ${
                      p.status === "PUBLISHED" 
                        ? "bg-emerald-950/40 text-status-emerald border border-status-emerald/30" 
                        : "bg-amber-950/40 text-status-amber border border-status-amber/30"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-2xs text-text-muted">{p.operationalStatus}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${p.id}`} className="p-1 rounded hover:bg-surface-inset text-brand">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Link href={`/projects/${p.slug}`} target="_blank" className="p-1 rounded hover:bg-surface-inset text-text-muted">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}