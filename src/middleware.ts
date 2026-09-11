import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "DEV_ONLY_UNSECURE_SECRET_KEY_CHANGE_IN_PRODUCTION_32BYTES"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (excluding /admin/login)
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApiRoute = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth/login");

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  const cookieName = process.env.NODE_ENV === "production" 
    ? "__Host-riithis_admin_session" 
    : "riithis_admin_session";

  const sessionToken = request.cookies.get(cookieName)?.value;

  if (!sessionToken) {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "UNAUTHORIZED_ACCESS_DENIED" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Cryptographically verify token in edge runtime
    await jwtVerify(sessionToken, JWT_SECRET);
    return NextResponse.next();
  } catch {
    if (isAdminApiRoute) {
      return NextResponse.json({ error: "SESSION_EXPIRED_OR_INVALID" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};