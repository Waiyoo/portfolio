import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionCookieName } from "./config";
import { verifySessionToken, SessionPayload } from "./tokens";

export async function getAuthenticatedAdmin(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;

    if (!token) {
      return null;
    }

    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export const AuthResponses = {
  unauthorized(): NextResponse {
    return NextResponse.json(
      { error: "UNAUTHORIZED" },
      { status: 401 }
    );
  },

  forbidden(message = "FORBIDDEN"): NextResponse {
    return NextResponse.json(
      { error: message },
      { status: 403 }
    );
  },
};
