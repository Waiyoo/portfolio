import { NextRequest, NextResponse } from "next/server";
import { authenticateCredentials } from "@/lib/auth/crypto";
import { createSessionToken, getSessionCookieOptions } from "@/lib/auth/tokens";
import { getSessionCookieName } from "@/lib/auth/config";
import { checkRateLimit } from "@/lib/auth/rateLimit";

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const limit = checkRateLimit(clientIp);

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "TOO_MANY_ATTEMPTS: Account locked. Try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": "900" } }
    );
  }

  try {
    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "INVALID_INPUT: Password is required" }, { status: 400 });
    }

    const isValid = await authenticateCredentials(password);

    if (!isValid) {
      return NextResponse.json(
        { error: "INVALID_CREDENTIALS", remainingAttempts: limit.remaining },
        { status: 401 }
      );
    }

    // Generate Session JWT
    const token = await createSessionToken("admin_01", "SUPER_ADMIN");
    const response = NextResponse.json({ success: true, status: "AUTHENTICATED" });

    // Set secure HttpOnly cookie
    response.cookies.set(
      getSessionCookieName(),
      token,
      getSessionCookieOptions()
    );

    return response;
  } catch {
    return NextResponse.json({ error: "INTERNAL_AUTHENTICATION_ERROR" }, { status: 500 });
  }
}