import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAdminPassword, createSessionToken } from '../../../utils/auth';
import { serialize } from 'cookie';

/**
 * Admin login endpoint
 * Validates password and creates secure session
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password required', message: 'Please enter a password' });
  }

  // Verify password
  if (!verifyAdminPassword(password)) {
    // Log failed attempt (in production, implement rate limiting on failed logins)
    console.warn('Failed login attempt from:', req.headers['x-forwarded-for'] || req.socket.remoteAddress);
    
    return res.status(401).json({ 
      error: 'Unauthorized', 
      message: 'Incorrect password. Please try again.' 
    });
  }

  // Create session token
  const token = createSessionToken(password);
  
  if (!token) {
    return res.status(500).json({ error: 'Server error', message: 'Failed to create session' });
  }

  // Set secure HTTP-only cookie
  const cookie = serialize('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/'
  });

  res.setHeader('Set-Cookie', cookie);

  return res.status(200).json({ 
    success: true, 
    token,
    message: 'Login successful' 
  });
}
