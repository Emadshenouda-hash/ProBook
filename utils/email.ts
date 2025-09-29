import { Resend } from 'resend';

export async function sendEmail(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX;
  const from = process.env.RESEND_FROM || 'no-reply@probooksolutions.com';
  if (!key || !to) return; // silently skip if not configured
  const resend = new Resend(key);
  await resend.emails.send({ from, to, subject, html });
}

