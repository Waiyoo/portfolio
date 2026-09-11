/**
 * Strict Security Parameters
 * Production secret keys are enforced via environment variables.
 */
export const AUTH_CONFIG = {
  COOKIE_NAME: "__Host-riithis_admin_session",
  DEV_COOKIE_NAME: "riithis_admin_session",
  CSRF_HEADER_NAME: "x-csrf-token",
  CSRF_COOKIE_NAME: "riithis_csrf_token",
  JWT_EXPIRY_SECONDS: 60 * 60 * 8, // 8 hours session duration
  BCRYPT_ROUNDS: 12,
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW_MS: 15 * 60 * 1000, // 15-minute lockout window
};

export function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("FATAL: ADMIN_JWT_SECRET environment variable is missing in production.");
    }
    // Safe development fallback key
    return new TextEncoder().encode("DEV_ONLY_UNSECURE_SECRET_KEY_CHANGE_IN_PRODUCTION_32BYTES");
  }
  
  return new TextEncoder().encode(secret);
}

export function getSessionCookieName(): string {
  return process.env.NODE_ENV === "production" 
    ? AUTH_CONFIG.COOKIE_NAME 
    : AUTH_CONFIG.DEV_COOKIE_NAME;
}