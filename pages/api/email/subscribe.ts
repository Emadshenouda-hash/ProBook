import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { sendEmail } from '../../../utils/email';
import { recordContact, notifyAdmin, sendConfirmEmail } from '../../../utils/notifier';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { provider, subscriber, listId } = req.body;
  const { email, firstName, lastName, source, tags, customFields } = subscriber;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ 
      success: false, 
      message: 'Valid email address is required' 
    });
  }

  try {
    switch (provider) {
      case 'resend':
        return await handleResendSubscription(req, res, subscriber);
      case 'mailchimp':
        return await handleMailchimpSubscription(req, res, subscriber, listId);
      case 'convertkit':
        return await handleConvertKitSubscription(req, res, subscriber, listId);
      default:
        return res.status(400).json({ 
          success: false, 
          message: 'Unsupported email provider' 
        });
    }
  } catch (error) {
    console.error('Email subscription error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Resend integration
async function handleResendSubscription(req: NextApiRequest, res: NextApiResponse, subscriber: any) {
  try {
    // Add to Resend contacts
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    
    // If no audience ID is set, just send welcome email without adding to audience
    if (audienceId) {
      const { data, error } = await resend.contacts.create({
        email: subscriber.email,
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        unsubscribed: false,
        audienceId: audienceId
      });

      if (error) {
        throw new Error(error.message);
      }
    }

    // Normalize record (consent=false until confirmed)
    await recordContact({
      type: 'subscriber',
      email: subscriber.email,
      name: [subscriber.firstName, subscriber.lastName].filter(Boolean).join(' ').trim(),
      source: subscriber.source || 'newsletter_form',
      utm_source: subscriber.customFields?.utm_source,
      utm_medium: subscriber.customFields?.utm_medium,
      utm_campaign: subscriber.customFields?.utm_campaign,
      utm_term: subscriber.customFields?.utm_term,
      utm_content: subscriber.customFields?.utm_content,
      consent: false,
      unsubscribed: false,
      tags: subscriber.tags || []
    });

    // Double opt-in email
    await sendConfirmEmail(subscriber.email);

    // Admin notification
    await notifyAdmin({
      type: 'subscriber',
      email: subscriber.email,
      name: [subscriber.firstName, subscriber.lastName].filter(Boolean).join(' ').trim(),
      source: subscriber.source || 'newsletter_form',
      tags: subscriber.tags || []
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed!' 
    });
  } catch (error: any) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || 'Failed to subscribe' 
    });
  }
}

// Mailchimp integration (placeholder)
async function handleMailchimpSubscription(req: NextApiRequest, res: NextApiResponse, subscriber: any, listId?: string) {
  // Implement Mailchimp API integration
  return res.status(200).json({ 
    success: true, 
    message: 'Mailchimp integration coming soon' 
  });
}

// ConvertKit integration (placeholder)
async function handleConvertKitSubscription(req: NextApiRequest, res: NextApiResponse, subscriber: any, listId?: string) {
  // Implement ConvertKit API integration
  return res.status(200).json({ 
    success: true, 
    message: 'ConvertKit integration coming soon' 
  });
}