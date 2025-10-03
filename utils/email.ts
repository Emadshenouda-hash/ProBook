import { Resend } from 'resend';

function parseEmailList(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.includes('@'));
}

export function getFromAddress(): string | null {
  // MUST be a verified domain in Resend
  const envFrom = process.env.RESEND_FROM;
  if (envFrom) return envFrom;
  // Fallback to a sensible default for this site (should also be verified)
  return 'info@probooksolutions.org';
}

export function getAdminRecipients(): string[] {
  const primary = parseEmailList(process.env.CONTACT_INBOX || '');
  const forward = parseEmailList(process.env.CONTACT_FORWARD_TO || '');
  const all = [...primary, ...forward];
  // de-duplicate
  return Array.from(new Set(all));
}

export async function sendEmail(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const recipients = getAdminRecipients();
  const from = getFromAddress();
  if (!key || recipients.length === 0 || !from) return;
  const resend = new Resend(key);
  await resend.emails.send({ from, to: recipients, subject, html });
}

export async function sendEmailTo(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const from = getFromAddress();
  if (!key || !to || !from) return;
  const resend = new Resend(key);
  await resend.emails.send({ from, to, subject, html, reply_to: replyTo ? [replyTo] : undefined });
}

