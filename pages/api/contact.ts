import type { NextApiRequest, NextApiResponse } from 'next';
import { createCrmContactAndDeal } from '../../utils/crm';
import { getSupabaseAdmin } from '../../utils/supabase';
import { saveToFirestore } from '../../utils/firebase';
import { sendEmail, sendEmailTo } from '../../utils/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
  const { name, email, message, website, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot pass
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }
  try {
    // Persist to Firebase (primary)
    try {
      await saveToFirestore('contact_submissions', { 
        name, email, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content 
      });
    } catch (fbError) {
      console.warn('Firebase save failed:', fbError);
    }
    
    // Fallback to Supabase if configured
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from('contact_submissions').insert({ name, email, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content });
    }
    await createCrmContactAndDeal({
      source: 'contact',
      fullName: name,
      email,
      notes: message,
      // pass UTMs when available
      budget: undefined,
      urgency: undefined
    });
    await sendEmail('New contact submission', `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>
      <p><strong>UTM Source:</strong> ${utm_source || ''}</p>
      <p><strong>UTM Medium:</strong> ${utm_medium || ''}</p>
      <p><strong>UTM Campaign:</strong> ${utm_campaign || ''}</p>
      <p><strong>UTM Term:</strong> ${utm_term || ''}</p>
      <p><strong>UTM Content:</strong> ${utm_content || ''}</p>`);
    if (email) {
      await sendEmailTo(
        email,
        'Thanks for contacting ProBook Solutions',
        `<p>Hi ${name || ''},</p>
         <p>Thanks for reaching out. We received your message and will get back to you soon.</p>
         <p>Best regards,<br/>ProBook Solutions</p>`,
        process.env.CONTACT_INBOX
      );
    }
  } catch (err) {
    console.warn('CRM create failed for contact:', err);
  }
  return res.status(200).json({ ok: true });
}

