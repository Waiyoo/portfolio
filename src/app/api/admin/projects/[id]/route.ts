import { NextRequest, NextResponse } from "next/server";
import { AuthResponses, getAuthenticatedAdmin } from "@/lib/auth/session";
import { logAuditAction, projectsStore } from "@/lib/store/adminStore";

async function requireAdmin() {
  const session = await getAuthenticatedAdmin();
  if (!session) return AuthResponses.unauthorized();
  if (session.role !== "SUPER_ADMIN") return AuthResponses.forbidden("FORBIDDEN: Requires SUPER_ADMIN privileges");
  return null;
}

export async function GET(_request: NextRequest, context: RouteContext<"/api/admin/projects/[id]">) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await context.params;
  const project = projectsStore.find((item) => item.id === id);
  if (!project) return NextResponse.json({ success: false, error: "PROJECT_NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ success: true, data: project });
}

export async function PATCH(request: NextRequest, context: RouteContext<"/api/admin/projects/[id]">) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await context.params;
  const index = projectsStore.findIndex((item) => item.id === id);
  if (index === -1) return NextResponse.json({ success: false, error: "PROJECT_NOT_FOUND" }, { status: 404 });

  try {
    const changes = await request.json();
    if (!changes.title || !changes.slug) return NextResponse.json({ success: false, error: "VALIDATION_FAILED: Title and slug are required" }, { status: 400 });
    if (projectsStore.some((item) => item.id !== id && item.slug === changes.slug)) return NextResponse.json({ success: false, error: "VALIDATION_FAILED: Slug is already in use" }, { status: 400 });

    const project = { ...projectsStore[index], ...changes, id, updatedAt: new Date().toISOString() };
    projectsStore[index] = project;
    logAuditAction("PROJECT_UPDATE", project.title);
    return NextResponse.json({ success: true, data: project });
  } catch {
    return NextResponse.json({ success: false, error: "BAD_REQUEST" }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext<"/api/admin/projects/[id]">) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await context.params;
  const index = projectsStore.findIndex((item) => item.id === id);
  if (index === -1) return NextResponse.json({ success: false, error: "PROJECT_NOT_FOUND" }, { status: 404 });

  const [project] = projectsStore.splice(index, 1);
  logAuditAction("PROJECT_DELETE", project.title);
  return NextResponse.json({ success: true, data: { deleted: true, id } });
}
