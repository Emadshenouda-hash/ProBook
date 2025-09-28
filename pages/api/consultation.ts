import type { NextApiRequest, NextApiResponse } from 'next';

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
    // TODO: integrate with CRM/email (e.g., SendGrid, HubSpot, Notion). For now, log server-side.
    console.log('Consultation request:', JSON.stringify(body));
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Consultation API error:', err);
    return res.status(500).json({ error: 'Failed to submit consultation' });
  }
}

