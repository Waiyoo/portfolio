type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

class LRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly maxKeys: number;
  private readonly defaultTtlMs: number;

  constructor(maxKeys = 200, defaultTtlMs = 60000) {
    this.maxKeys = maxKeys;
    this.defaultTtlMs = defaultTtlMs;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    // Refresh position for LRU eviction logic
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.data;
  }

  set(key: string, data: T, ttlMs = this.defaultTtlMs): void {
    if (this.cache.size >= this.maxKeys) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
    });
  }

  invalidatePattern(pattern: RegExp): void {
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.cache.delete(key);
      }
    }
  }
}

export const queryCache = new LRUCache<any>(500, 1000 * 60 * 5); // 5 minute default TTL