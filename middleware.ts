// middleware.ts excerpt logic
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAdminApiRoute = req.nextUrl.pathname.startsWith("/api/v1/admin");

  if ((isAdminRoute && !req.nextUrl.pathname.startsWith("/admin/login")) || isAdminApiRoute) {
    if (!token || token.role !== "ADMIN") {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Unauthorized access attempt" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}