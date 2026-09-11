import bcrypt from "bcryptjs";
import { AUTH_CONFIG } from "./config";

/**
 * Hashes a raw password string using bcrypt with cost factor 12.
 */
export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, AUTH_CONFIG.BCRYPT_ROUNDS);
}

/**
 * Constant-time comparison between raw input and stored password hash.
 */
export async function verifyPassword(plainText: string, storedHash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainText, storedHash);
  } catch {
    return false;
  }
}

/**
 * Validates admin user credentials against environment hashes.
 */
export async function authenticateCredentials(password: string): Promise<boolean> {
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  // Development fallback authentication (explicitly isolated)
  if (!adminHash) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_PASSWORD_HASH must be defined in production environment.");
    }
    // Dev password: "admin_password_2026"
    const DEV_HASH = "$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";
    return verifyPassword(password, DEV_HASH);
  }

  return verifyPassword(password, adminHash);
}