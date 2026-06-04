interface Entry<T> { value: T; exp: number; }

const store = new Map<string, Entry<any>>();

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry || Date.now() > entry.exp) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  store.set(key, { value, exp: Date.now() + ttlMs });
}

export const TTL = {
  MORNING: 90 * 60_000,   // 90 minutes
};

export function hourBucket(): string {
  return new Date().toISOString().slice(0, 13); // "2026-06-01T10"
}
