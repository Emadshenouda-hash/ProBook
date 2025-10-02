import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

/**
 * Admin logout endpoint
 * Clears session cookie
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Clear the admin token cookie
  const cookie = serialize('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/'
  });

  res.setHeader('Set-Cookie', cookie);

  return res.status(200).json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
}
