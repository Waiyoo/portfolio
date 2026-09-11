// src/app/admin/projects/[id]/page.tsx
"use client";

import React, { use, useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ProjectRecord } from "@/types/admin";
import { Save, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const newProject = (): ProjectRecord => ({
  id: "",
  slug: "",
  title: "",
  category: "Business Management Systems",
  tagline: "",
  status: "DRAFT",
  operationalStatus: "IN_DEVELOPMENT",
  overview: "",
  objective: "",
  problem: "",
  solution: "",
  features: [],
  technologies: [],
  images: [],
  links: {},
  updatedAt: new Date().toISOString(),
});

export default function ProjectEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";
  const [project, setProject] = useState<ProjectRecord>(newProject);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isNew) return;
    let active = true;
    fetch(`/api/admin/projects/${id}`)
      .then(async (response) => ({ response, result: await response.json() }))
      .then(({ response, result }) => {
        if (!active) return;
        if (!response.ok || !result.success) {
          setError(result.error || "Project not found.");
          return;
        }
        setProject(result.data);
      })
      .catch(() => active && setError("Unable to load this project."));
    return () => { active = false; };
  }, [id, isNew]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!project.title.trim() || !project.slug.trim()) {
      setError("Project title and slug are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(isNew ? "/api/admin/projects" : `/api/admin/projects/${id}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.error || "Unable to save this project.");
        return;
      }
      router.push("/admin/projects");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isNew) {
      router.push("/admin/projects");
      return;
    }
    if (confirm("Are you sure you want to delete this project?")) {
      const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!response.ok) {
        setError("Unable to delete this project. Please try again.");
        return;
      }
      router.push("/admin/projects");
      router.refresh();
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
            <h1 className="text-xl font-bold text-text-primary">{isNew ? "Create project" : `Editor: ${project.title || id}`}</h1>
          </div>
          {!isNew && <button
            onClick={handleDelete}
            className="py-1.5 px-3 rounded border border-status-rose/40 text-status-rose font-mono text-2xs hover:bg-rose-950/20 flex items-center gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>DELETE</span>
          </button>}
        </div>

        <form onSubmit={handleSave} className="p-6 rounded border border-border bg-surface space-y-4 text-xs">
          {error && <p role="alert" className="rounded border border-status-rose/40 bg-rose-950/20 p-3 font-mono text-2xs text-status-rose">{error}</p>}
          
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
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded bg-brand text-brand-contrast font-mono text-xs font-bold hover:bg-brand/90 flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? "SAVING…" : isNew ? "CREATE_PROJECT" : "SAVE_PROJECT_CHANGES"}</span>
          </button>

        </form>
      </main>
    </div>
  );
}
