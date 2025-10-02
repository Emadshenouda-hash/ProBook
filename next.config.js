/**
 * Shared security headers and CSP
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  // Update deprecated interest-cohort to browsing-topics and explicitly disable sensors
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), accelerometer=(), gyroscope=(), magnetometer=(), payment=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-Download-Options', value: 'noopen' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' }
];

// A conservative Content Security Policy suitable for this site. Adjust domains as integrations change.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  // Images used across the site (including Unsplash patterns and data/blob URIs for OG/svg and uploads)
  "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com",
  // Fonts and styles (Google fonts)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // Scripts (Next, GA/GTAG, Calendly); allow inline for Next/JSON-LD
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com",
  // XHR/websocket endpoints (OpenAI/DeepSeek, Vercel analytics, Supabase)
  "connect-src 'self' https://api.openai.com https://api.deepseek.com https://vitals.vercel-insights.com https://*.supabase.co",
  // Frames (Calendly embed)
  "frame-src https://calendly.com",
  // Asset storage (Vercel Blob public URLs)
  "media-src 'self' https://*.blob.vercel-storage.com",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          // Apply a conservative Content Security Policy. In development you can
          // switch this header to Content-Security-Policy-Report-Only to iterate safely.
          { key: 'Content-Security-Policy', value: csp }
        ]
      },
      {
        // Long-cache static assets (not HTML)
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|css|js|woff|woff2|ttf|otf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  },
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE === 'true') {
      // Lightweight size hints via webpack stats (use with external analyzer if desired)
      config.stats = 'normal';
    }
    return config;
  }
};

module.exports = nextConfig;