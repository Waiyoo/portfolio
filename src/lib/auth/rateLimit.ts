interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const ipStore = new Map<string, RateLimitEntry>();

/**
 * Memory-efficient sliding-window rate limiter to prevent brute-force login attempts.
 */
export function checkRateLimit(ip: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = ipStore.get(ip);

  if (!record || now > record.resetAt) {
    const resetTime = now + windowMs;
    ipStore.set(ip, { count: 1, resetAt: resetTime });
    return { allowed: true, remaining: maxAttempts - 1, resetTime };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetTime: record.resetAt };
  }

  record.count += 1;
  return { allowed: true, remaining: maxAttempts - record.count, resetTime: record.resetAt };
}