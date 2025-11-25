class Cache {
  constructor(ttlMs = 10 * 60 * 1000, maxSize = 100) {
    this.ttlMs = ttlMs;
    this.maxSize = maxSize;
    this.store = new Map();
  }

  isExpired(entry) {
    return Date.now() - entry.timestamp > this.ttlMs;
  }

  get(key) {
    const entry = this.store.get(key.toLowerCase());
    if (!entry) return null;
    if (this.isExpired(entry)) {
      this.store.delete(key.toLowerCase());
      return null;
    }
    return entry.value;
  }

  set(key, value) {
    if (this.store.size >= this.maxSize) {
      const firstKey = this.store.keys().next().value;
      this.store.delete(firstKey);
    }
    this.store.set(key.toLowerCase(), { value, timestamp: Date.now() });
  }
}

export default Cache;
