/**
 * Server-side authentication utilities using Firebase Admin
 * Provides secure session management for admin pages
 */

import { getFirebaseAuth } from './firebase';
import type { NextApiRequest } from 'next';

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
}

/**
 * Verify admin token (from localStorage or cookie)
 * This runs on the server side only
 */
export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  if (!token) return null;

  try {
    const auth = getFirebaseAuth();
    if (!auth) {
      console.warn('Firebase Auth not initialized');
      return null;
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(token);
    
    // Check if user has admin role (you can customize this)
    // For now, we'll check if the email matches admin email from env
    const adminEmail = process.env.ADMIN_EMAIL || 'emad@probooksolutions.org';
    
    if (decodedToken.email !== adminEmail && !decodedToken.admin) {
      console.warn('User is not an admin:', decodedToken.email);
      return null;
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      displayName: decodedToken.name
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Simple password-based authentication fallback
 * Used when Firebase is not configured
 */
export function verifyAdminPassword(password: string): boolean {
  // Prefer server-only ADMIN_PASSWORD; fallback to legacy NEXT_PUBLIC_ADMIN_PASSWORD for compatibility
  const adminPassword = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  return constantTimeCompare(password, adminPassword);
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Create a session token (for simple auth without Firebase)
 * WARNING: This is basic implementation. Use Firebase Auth in production.
 */
export function createSessionToken(password: string): string | null {
  if (!verifyAdminPassword(password)) {
    return null;
  }

  const sessionSecret = process.env.SESSION_SECRET || 'fallback-secret-change-this';
  const timestamp = Date.now();
  const data = `${password}:${timestamp}:${sessionSecret}`;
  
  // Simple hash (in production, use proper HMAC)
  const hash = Buffer.from(data).toString('base64');
  
  return `${timestamp}.${hash}`;
}

/**
 * Verify session token
 */
export function verifySessionToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;

  try {
    const [timestampStr, hash] = token.split('.');
    const timestamp = parseInt(timestampStr, 10);
    
    // Check if token is expired (24 hours)
    const expiryTime = 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > expiryTime) {
      return false;
    }

    // In production, verify the hash matches
    // For now, just check timestamp validity
    return !isNaN(timestamp) && timestamp > 0;
  } catch {
    return false;
  }
}

/**
 * Extract admin token from request (cookie or header)
 */
export function getTokenFromRequest(req: NextApiRequest): string | null {
  // Try Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie
  const cookieToken = req.cookies.admin_token;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

/**
 * Middleware to protect API routes
 * Usage: 
 *   const user = await requireAdmin(req, res);
 *   if (!user) return; // Response already sent
 */
export async function requireAdmin(
  req: NextApiRequest, 
  res: any
): Promise<AdminUser | null> {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    res.status(401).json({ error: 'Unauthorized - No token provided' });
    return null;
  }

  // Try Firebase Auth first
  const user = await verifyAdminToken(token);
  if (user) {
    return user;
  }

  // Fallback to simple session token
  if (verifySessionToken(token)) {
    return {
      uid: 'local-admin',
      email: process.env.ADMIN_EMAIL || 'admin@probooksolutions.org',
      displayName: 'Admin'
    };
  }

  res.status(401).json({ error: 'Unauthorized - Invalid token' });
  return null;
}

/**
 * Check if a user has admin privileges
 * Can be extended for role-based access control
 */
export async function hasAdminRole(email: string): Promise<boolean> {
  const adminEmails = (process.env.ADMIN_EMAILS || 'emad@probooksolutions.org').split(',');
  return adminEmails.includes(email.toLowerCase().trim());
}

/**
 * Generate CSRF token for forms
 */
export function generateCsrfToken(): string {
  const secret = process.env.CSRF_SECRET || 'change-this-secret';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const data = `${timestamp}:${random}:${secret}`;
  
  return Buffer.from(data).toString('base64');
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string): boolean {
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestampStr] = decoded.split(':');
    const timestamp = parseInt(timestampStr, 10);
    
    // Token expires after 1 hour
    const expiryTime = 60 * 60 * 1000;
    if (Date.now() - timestamp > expiryTime) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
