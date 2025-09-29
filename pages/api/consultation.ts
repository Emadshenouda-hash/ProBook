import type { NextApiRequest, NextApiResponse } from 'next';
import { createCrmContactAndDeal } from '../../utils/crm';
import { getSupabaseAdmin } from '../../utils/supabase';
import { sendEmail } from '../../utils/email';

interface ConsultationPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  companySize?: string;
  industry?: string;
  country?: string;
  services?: string[];
  systems?: string[];
  budget?: string;
  urgency?: string;
  goals?: string;
  notes?: string;
  website?: string; // honeypot
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body = req.body as ConsultationPayload;

  // Basic validation
  if (body.website) return res.status(400).json({ error: 'Spam detected' });
  const fullName = (body.fullName || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const company = (body.company || '').trim();
  if (!fullName || fullName.length < 2) return res.status(400).json({ error: 'Invalid name' });
  if (!/.+@.+\..+/.test(email)) return res.status(400).json({ error: 'Invalid email' });
  if (!company) return res.status(400).json({ error: 'Company required' });

  try {
    // Persist to Supabase if configured
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await supabase.from('consultation_requests').insert({
        full_name: body.fullName,
        email: body.email,
        phone: body.phone,
        company: body.company,
        company_size: body.companySize,
        industry: body.industry,
        country: body.country,
        services: body.services || [],
        systems: body.systems || [],
        budget: body.budget,
        urgency: body.urgency,
        goals: body.goals,
        notes: body.notes,
        attachment_url: (body as any).attachmentUrl || null
      });
    }
    await createCrmContactAndDeal({
      source: 'consultation',
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      company: body.company,
      industry: body.industry,
      country: body.country,
      budget: body.budget,
      urgency: body.urgency,
      goals: body.goals,
      notes: body.notes
    });
    await sendEmail('New consultation request', `
      <p><strong>Name:</strong> ${body.fullName}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || ''}</p>
      <p><strong>Company:</strong> ${body.company || ''}</p>
      <p><strong>Industry:</strong> ${body.industry || ''}</p>
      <p><strong>Country:</strong> ${body.country || ''}</p>
      <p><strong>Budget:</strong> ${body.budget || ''}</p>
      <p><strong>Urgency:</strong> ${body.urgency || ''}</p>
      <p><strong>Services:</strong> ${(body.services || []).join(', ')}</p>
      <p><strong>Systems:</strong> ${(body.systems || []).join(', ')}</p>
      <p><strong>Goals:</strong> ${body.goals || ''}</p>
      <p><strong>Notes:</strong> ${body.notes || ''}</p>
      <p><strong>Attachment:</strong> ${(body as any).attachmentUrl || ''}</p>
    `);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Consultation API error:', err);
    return res.status(500).json({ error: 'Failed to submit consultation' });
  }
}

