// src/app/admin/projects/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { projectsStore, logAuditAction } from "@/lib/store/adminStore";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProjectRecord } from "@/types/admin";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectEditorPage({ params }: { params: { id: string } }) {
  const router = Router = useRouter();
  const existing = projectsStore.find((p) => p.id === params.id) || projectsStore[0];
  const [project, setProject] = useState<ProjectRecord>(existing);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const idx = projectsStore.findIndex((p) => p.id === project.id);
    if (idx !== -1) {
      projectsStore[idx] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projectsStore.push(project);
    }
    logAuditAction("PROJECT_UPDATE", project.title);
    alert("Project saved successfully.");
    router.push("/admin/projects");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      const idx = projectsStore.findIndex((p) => p.id === project.id);
      if (idx !== -1) projectsStore.splice(idx, 1);
      logAuditAction("PROJECT_DELETE", project.title);
      router.push("/admin/projects");
    }
  };

  return (
    <div className="flex min-h-screen bg-surface-inset">
      <AdminSidebar activeRoute="/admin/projects" />

      <main className="flex-1 p-8 space-y-6 font-sans max-w-4xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/projects" className="p-2 rounded bg-surface border border-border text-text-muted">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-xl font-bold text-text-primary">Editor: {project.title}</h1>
          </div>
          <button
            onClick={handleDelete}
            className="py-1.5 px-3 rounded border border-status-rose/40 text-status-rose font-mono text-2xs hover:bg-rose-950/20 flex items-center gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>DELETE</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 rounded border border-border bg-surface space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-2xs font-bold text-text-primary uppercase">Project Title</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                className="w-full p-2 rounded bg-surface-inset border border-border text-text-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-2xs font-bold text-text-primary uppercase">Slug</label>
              <input
                type="text"
                value={project.slug}
                onChange={(e) => setProject({ ...project, slug: e.target.value })}
                className="w-full p-2 rounded bg-surface-inset border border-border text-text-primary font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-2xs font-bold text-text-primary uppercase">Publication Status</label>
              <select
                value={project.status}
                onChange={(e) => setProject({ ...project, status: e.target.value as any })}
                className="w-full p-2 rounded bg-surface-inset border border-border text-text-primary"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-2xs font-bold text-text-primary uppercase">Operational Status</label>
              <select
                value={project.operationalStatus}
                onChange={(e) => setProject({ ...project, operationalStatus: e.target.value as any })}
                className="w-full p-2 rounded bg-surface-inset border border-border text-text-primary"
              >
                <option value="COMPLETED_PROTOTYPE">COMPLETED_PROTOTYPE</option>
                <option value="PARTIALLY_COMPLETED">PARTIALLY_COMPLETED</option>
                <option value="IN_DEVELOPMENT">IN_DEVELOPMENT</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-mono text-2xs font-bold text-text-primary uppercase">Tagline</label>
            <input
              type="text"
              value={project.tagline}
              onChange={(e) => setProject({ ...project, tagline: e.target.value })}
              className="w-full p-2 rounded bg-surface-inset border border-border text-text-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="font-mono text-2xs font-bold text-text-primary uppercase">Overview</label>
            <textarea
              rows={3}
              value={project.overview}
              onChange={(e) => setProject({ ...project, overview: e.target.value })}
              className="w-full p-2 rounded bg-surface-inset border border-border text-text-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded bg-brand text-brand-contrast font-mono text-xs font-bold hover:bg-brand/90 flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>SAVE_PROJECT_CHANGES</span>
          </button>

        </form>
      </main>
    </div>
  );
}