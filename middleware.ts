import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rlIsLimited } from './utils/rateLimit';

/**
 * Simple in-memory rate limiter for API routes.
 * For production, use a service like Upstash Redis or Vercel Edge Config.
 * This implementation uses a Map to track requests by IP address.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function getRateLimitKey(request: NextRequest): string {
  // Try to get real IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0] || 'unknown';
  const path = new URL(request.url).pathname;
  
  return `${ip}:${path}`;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    // No entry or window expired, create new entry
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return true;
  }

  // Increment count
  entry.count += 1;
  rateLimitMap.set(key, entry);
  return false;
}

function getRateLimitHeaders(key: string): Record<string, string> {
  const entry = rateLimitMap.get(key);
  if (!entry) {
    return {
      'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
      'X-RateLimit-Remaining': String(RATE_LIMIT_MAX_REQUESTS),
      'X-RateLimit-Reset': String(Math.floor((Date.now() + RATE_LIMIT_WINDOW) / 1000))
    };
  }

  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count);
  const resetTime = Math.floor(entry.resetTime / 1000);

  return {
    'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(resetTime)
  };
}

// Clean up old entries periodically (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const entries = Array.from(rateLimitMap.entries());
    entries.forEach(([key, entry]) => {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply rate limiting to API routes and form submissions
  const protectedPaths = [
    '/api/contact',
    '/api/consultation',
    '/api/consultation-upload',
    '/api/chat'
  ];

  const shouldRateLimit = protectedPaths.some(path => pathname.startsWith(path));

  if (!shouldRateLimit) {
    return NextResponse.next();
  }

  const { limited, headers } = await rlIsLimited(request);

  if (limited) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests. Please try again later.',
        retryAfter: headers['X-RateLimit-Reset']
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((parseInt(headers['X-RateLimit-Reset']) * 1000 - Date.now()) / 1000)),
          ...headers
        }
      }
    );
  }

  // Add rate limit headers to successful responses
  const response = NextResponse.next();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    '/api/contact',
    '/api/consultation',
    '/api/consultation-upload',
    '/api/chat'
  ]
};
