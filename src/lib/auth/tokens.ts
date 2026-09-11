import { SignJWT, jwtVerify } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { AUTH_CONFIG, getJwtSecret, getSessionCookieName } from "./config";

export interface SessionPayload {
  sub: string;
  role: "SUPER_ADMIN" | "ADMIN";
  iat: number;
  exp: number;
}

/**
 * Creates an encrypted JWT session token.
 */
export async function createSessionToken(userId: string, role: "SUPER_ADMIN" | "ADMIN" = "SUPER_ADMIN"): Promise<string> {
  const secret = getJwtSecret();
  const now = Math.floor(Date.now() / 1000);

  return new SignJWT({ sub: userId, role })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + AUTH_CONFIG.JWT_EXPIRY_SECONDS)
    .sign(secret);
}

/**
 * Cryptographically verifies JWT session token validity.
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Formats HttpOnly, Secure cookie options for browser session persistence.
 */
export function getSessionCookieOptions(expiryDate?: Date): Omit<ResponseCookie, "name" | "value"> {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    expires: expiryDate || new Date(Date.now() + AUTH_CONFIG.JWT_EXPIRY_SECONDS * 1000),
  };
}