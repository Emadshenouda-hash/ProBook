import crypto from 'crypto';

export type TokenType = 'confirm' | 'unsubscribe';

function getSecret(): string {
  const secret = process.env.TOKEN_SECRET || process.env.SESSION_SECRET || 'change-me-secret';
  return secret;
}

function base64url(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function createEmailToken(email: string, type: TokenType, expiresInSeconds: number = 60 * 60 * 24 * 7): string {
  const payload = {
    e: email.toLowerCase().trim(),
    t: type,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds
  };
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = base64url(payloadStr);
  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(payloadB64);
  const sig = base64url(hmac.digest());
  return `${payloadB64}.${sig}`;
}

export function verifyEmailToken(token: string, expectedType?: TokenType): { email: string } | null {
  if (!token || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(payloadB64);
  const expected = base64url(hmac.digest());
  if (expected !== sig) return null;
  try {
    const json = Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
    const data = JSON.parse(json) as { e: string; t: TokenType; iat: number; exp: number };
    if (expectedType && data.t !== expectedType) return null;
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: (data.e || '').toLowerCase().trim() };
  } catch {
    return null;
  }
}

