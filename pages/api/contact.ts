import type { NextApiRequest, NextApiResponse } from 'next';
import { createCrmContactAndDeal } from '../../utils/crm';
import { getSupabaseAdmin } from '../../utils/supabase';
import { saveToFirestore } from '../../utils/firebase';
import { sendEmail, sendEmailTo } from '../../utils/email';
import { recordContact, notifyAdmin } from '../../utils/notifier';

/**
 * Contact form submission handler
 * 🔐 PROTECTED: Rate-limited by middleware, includes spam protection
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }
  
  const { name, email, message, website, utm_source, utm_medium, utm_campaign, utm_term, utm_content } = req.body || {};
  
  // Honeypot check - if filled, it's a bot
  if (website) return res.status(200).json({ ok: true });
  
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email format' });
  }
  
  // Length validation
  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ ok: false, error: 'Name must be between 2-100 characters' });
  }
  
  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({ ok: false, error: 'Message must be between 10-5000 characters' });
  }
  try {
    // Normalize and persist to `contacts`
    await recordContact({
      type: 'contact',
      email,
      name,
      message,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      source: 'contact_form'
    });
    
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
    await notifyAdmin({
      type: 'contact',
      email,
      name,
      message,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      source: 'contact_form'
    });
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

