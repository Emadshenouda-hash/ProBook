import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
  const { name, email, message, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot pass
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }
  // TODO: Integrate with email provider (Resend/SendGrid). For now, log.
  console.log('Contact submission', { name, email, message });
  return res.status(200).json({ ok: true });
}

