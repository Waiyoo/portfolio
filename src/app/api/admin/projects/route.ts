import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin, AuthResponses } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  // Authorization check
  const session = await getAuthenticatedAdmin();
  if (!session) {
    return AuthResponses.unauthorized();
  }

  // Role authorization check
  if (session.role !== "SUPER_ADMIN") {
    return AuthResponses.forbidden("FORBIDDEN: Requires SUPER_ADMIN privileges");
  }

  try {
    const data = await request.json();

    // Data validation logic
    if (!data.title || !data.slug) {
      return NextResponse.json({ error: "VALIDATION_FAILED: Missing required fields" }, { status: 400 });
    }

    return NextResponse.json({ success: true, project: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }
}