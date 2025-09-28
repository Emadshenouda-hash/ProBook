import type { NextApiRequest, NextApiResponse } from 'next';
import { createCrmContactAndDeal } from '../../utils/crm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
  const { name, email, message, website } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot pass
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }
  try {
    await createCrmContactAndDeal({
      source: 'contact',
      fullName: name,
      email,
      notes: message
    });
  } catch (err) {
    console.warn('CRM create failed for contact:', err);
  }
  return res.status(200).json({ ok: true });
}

