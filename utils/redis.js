import { createClient } from "redis";

import { promisify } from "util";

class RedisClient {
  // """constructing a client"""
  constructor() {
    this.client = createClient();
    this.connected = true;
    this.client.on('connect', () => {
      this.connected = true;
    });
    this.client.on('error', (err) => {
      console.log('Redis error on connection: ', err);
      this.connected = false;
    });
    // Promisify the necessary Redis methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    return this.getAsync(key);
  }

  async set(key, value, duration) {
    await this.setexAsync(key, duration, value);
  };

  async del(key) {
    this.delAsync(key);
  };
}

const redisClient = new RedisClient();
export default redisClient;
