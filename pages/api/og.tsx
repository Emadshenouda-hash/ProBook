import type { NextApiRequest, NextApiResponse } from 'next';

// Lightweight dynamic OG image placeholder (SVG) - upgrade to @vercel/og if desired
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const title = (req.query.title as string) || 'ProBook Solutions';
  const subtitle = (req.query.subtitle as string) || 'Accounting & Financial Services';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0b5ed7"/>
        <stop offset="100%" stop-color="#7c3aed"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="72" y="300" font-size="64" font-family="Inter, Arial, sans-serif" fill="#fff" font-weight="700">${title}</text>
    <text x="72" y="370" font-size="36" font-family="Inter, Arial, sans-serif" fill="#e5e7eb">${subtitle}</text>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(svg);
}

