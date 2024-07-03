export class TTLCache {
  constructor(ttl) {
    this.ttl = ttl;
    this.cache = new Map();
  }

  set(key, value) {
    const now = Date.now();
    this.cache.set(key, { value, expiry: now + this.ttl });
  }

  get(key) {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expiry) {
      return item.value;
    }
    this.cache.delete(key);
    return null;
  }

  clearExpired() {
    const now = Date.now();
    for (const [key, { expiry }] of this.cache.entries()) {
      if (now >= expiry) {
        this.cache.delete(key);
      }
    }
  }
}
