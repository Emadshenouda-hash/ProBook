import type { NextRequest } from 'next/server';

// Optional Upstash-based rate limiter with in-memory fallback
let upstashAvailable = false as boolean;
let ratelimit: any = null;

try {
  // Dynamically require to avoid build-time issues if not installed
  // but we do install in package.json. This guards local dev without envs.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Ratelimit } = require('@upstash/ratelimit');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Redis } = require('@upstash/redis');

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN
    });
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
      prefix: 'pb:rl:'
    });
    upstashAvailable = true;
  }
} catch {
  upstashAvailable = false;
}

type Entry = { count: number; resetTime: number };
const memStore = new Map<string, Entry>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

function getKey(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0] || 'unknown';
  const path = new URL(request.url).pathname;
  return `${ip}:${path}`;
}

export async function rlIsLimited(request: NextRequest): Promise<{ limited: boolean; headers: Record<string, string> }> {
  const key = getKey(request);

  if (upstashAvailable && ratelimit) {
    const { success, reset, remaining, limit } = await ratelimit.limit(key);
    const headers: Record<string, string> = {
      'X-RateLimit-Limit': String(limit ?? MAX_REQUESTS),
      'X-RateLimit-Remaining': String(Math.max(0, (remaining ?? 0))),
      'X-RateLimit-Reset': String(Math.floor((reset ?? Date.now()) / 1000))
    };
    return { limited: !success, headers };
  }

  // In-memory fallback
  const now = Date.now();
  const entry = memStore.get(key);
  if (!entry || now > entry.resetTime) {
    memStore.set(key, { count: 1, resetTime: now + WINDOW_MS });
    return { limited: false, headers: {
      'X-RateLimit-Limit': String(MAX_REQUESTS),
      'X-RateLimit-Remaining': String(MAX_REQUESTS - 1),
      'X-RateLimit-Reset': String(Math.floor((now + WINDOW_MS) / 1000))
    } };
  }
  entry.count += 1;
  memStore.set(key, entry);
  const remaining = Math.max(0, MAX_REQUESTS - entry.count);
  return { limited: entry.count > MAX_REQUESTS, headers: {
    'X-RateLimit-Limit': String(MAX_REQUESTS),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(Math.floor(entry.resetTime / 1000))
  } };
}

