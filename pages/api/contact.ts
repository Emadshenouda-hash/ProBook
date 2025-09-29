import type { NextApiRequest, NextApiResponse } from 'next';
import { createCrmContactAndDeal } from '../../utils/crm';
import { getSupabaseAdmin } from '../../utils/supabase';
import { sendEmail } from '../../utils/email';

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
    // Persist to Supabase if configured
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from('contact_submissions').insert({ name, email, message });
    }
    await createCrmContactAndDeal({
      source: 'contact',
      fullName: name,
      email,
      notes: message
    });
    await sendEmail('New contact submission', `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`);
  } catch (err) {
    console.warn('CRM create failed for contact:', err);
  }
  return res.status(200).json({ ok: true });
}

