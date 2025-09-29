import { Resend } from 'resend';

function getFromAddress(): string | null {
  const envFrom = process.env.RESEND_FROM;
  if (envFrom) return envFrom;
  const inbox = process.env.CONTACT_INBOX;
  if (inbox && inbox.includes('@')) {
    const domain = inbox.split('@')[1];
    return `no-reply@${domain}`;
  }
  return null;
}

export async function sendEmail(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX;
  const from = getFromAddress();
  if (!key || !to || !from) return;
  const resend = new Resend(key);
  await resend.emails.send({ from, to, subject, html });
}

export async function sendEmailTo(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const from = getFromAddress();
  if (!key || !to || !from) return;
  const resend = new Resend(key);
  await resend.emails.send({ from, to, subject, html, reply_to: replyTo ? [replyTo] : undefined });
}

