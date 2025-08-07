interface CacheItem<T> {
  value: T;
  expiry: number;
}

export class TTLCache<T = any> {
  private ttl: number;
  private cache: Map<string, CacheItem<T>>;

  constructor(ttl: number) {
    this.ttl = ttl;
    this.cache = new Map();
  }

  set(key: string, value: T): void {
    const now = Date.now();
    this.cache.set(key, { value, expiry: now + this.ttl });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expiry) {
      return item.value;
    }
    this.cache.delete(key);
    return null;
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, { expiry }] of Array.from(this.cache.entries())) {
      if (now >= expiry) {
        this.cache.delete(key);
      }
    }
  }
}
