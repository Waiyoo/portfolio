import { NextResponse } from "next/server";
import { projectsStore } from "@/lib/store/adminStore";

export async function GET() {
  // Keep the public portfolio usable from a fresh local checkout. A database
  // implementation can replace this source without changing the response.
  const projects = projectsStore.filter((project) => project.status === "PUBLISHED");
  return NextResponse.json({ success: true, data: projects });
}
