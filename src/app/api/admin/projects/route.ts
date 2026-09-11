import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin, AuthResponses } from "@/lib/auth/session";
import { logAuditAction, projectsStore } from "@/lib/store/adminStore";
import { ProjectRecord } from "@/types/admin";

function authorized(session: Awaited<ReturnType<typeof getAuthenticatedAdmin>>) {
  return session?.role === "SUPER_ADMIN";
}

export async function GET() {
  const session = await getAuthenticatedAdmin();
  if (!session) return AuthResponses.unauthorized();
  if (!authorized(session)) return AuthResponses.forbidden("FORBIDDEN: Requires SUPER_ADMIN privileges");

  return NextResponse.json({ success: true, data: projectsStore });
}

export async function POST(request: NextRequest) {
  // Authorization check
  const session = await getAuthenticatedAdmin();
  if (!session) {
    return AuthResponses.unauthorized();
  }

  // Role authorization check
  if (!authorized(session)) {
    return AuthResponses.forbidden("FORBIDDEN: Requires SUPER_ADMIN privileges");
  }

  try {
    const data = await request.json();

    if (!data.title || !data.slug || projectsStore.some((project) => project.slug === data.slug)) {
      return NextResponse.json({ error: "VALIDATION_FAILED: Missing required fields" }, { status: 400 });
    }

    const project: ProjectRecord = {
      ...data,
      id: data.id || `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      status: data.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      updatedAt: new Date().toISOString(),
      category: data.category || "Business Management Systems",
      operationalStatus: data.operationalStatus || "IN_DEVELOPMENT",
      tagline: data.tagline || "",
      overview: data.overview || "",
      objective: data.objective || "",
      problem: data.problem || "",
      solution: data.solution || "",
      features: Array.isArray(data.features) ? data.features : [],
      technologies: Array.isArray(data.technologies) ? data.technologies : [],
      images: Array.isArray(data.images) ? data.images : [],
      links: data.links || {},
    };
    projectsStore.unshift(project);
    logAuditAction("PROJECT_CREATE", project.title);

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }
}
