import Redis from 'ioredis';
import { ServerOptions } from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { cacheConfig } from 'src/shared/config/cache.config';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    // publish các message
    const pubClient = new Redis({
      host: cacheConfig.host,
      port: cacheConfig.port,
      password: cacheConfig.password,
      family: cacheConfig.family || 4,
      ...(cacheConfig.tls ? { tls: {} } : {}),
      connectTimeout: 3000,
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
    // subscribe các message.
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);
    // Tạo Redis adapter cho Socket.IO, giúp các instance sync với nhau.
    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    // tạo server
    const server = super.createIOServer(port, options);
    // gắn Redis Adapter vào server
    server.adapter(this.adapterConstructor);
    return server;
  }
}
