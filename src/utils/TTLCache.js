export class TTLCache {
  constructor(ttl) {
    this.ttl = ttl;
    this.cache = {};
  }

  set(key, value) {
    const now = Date.now();
    this.cache[key] = { value, expiry: now + this.ttl };
  }

  get(key) {
    const item = this.cache[key];
    if (item && Date.now() < item.expiry) {
      return item.value;
    }
    delete this.cache[key];
    return null;
  }
}
