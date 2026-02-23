export type RedisConfig = {
  url: string;
};

export function getRedisConfig(): RedisConfig {
  return {
    url: process.env.REDIS_URL ?? 'redis://localhost:6379',
  };
}

export async function pingRedis() {
  return { ok: true, message: `Redis config loaded (${getRedisConfig().url})` };
}
