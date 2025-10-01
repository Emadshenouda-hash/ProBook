import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

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
    const { data, error } = await resend.contacts.create({
      email: subscriber.email,
      firstName: subscriber.firstName,
      lastName: subscriber.lastName,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID
    });

    if (error) {
      throw new Error(error.message);
    }

    // Send welcome email
    await resend.emails.send({
      from: 'ProBook Solutions <info@probooksolutions.com>',
      to: [subscriber.email],
      subject: 'Welcome to ProBook Solutions!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to ProBook Solutions!</h2>
          <p>Hi ${subscriber.firstName || 'there'},</p>
          <p>Thank you for subscribing to our updates. We're excited to help you with your accounting and financial needs.</p>
          <p>Here's what you can expect:</p>
          <ul>
            <li>Expert accounting tips and insights</li>
            <li>Industry updates and best practices</li>
            <li>Exclusive offers and resources</li>
            <li>Early access to new services</li>
          </ul>
          <p>If you have any questions, feel free to reply to this email or visit our website.</p>
          <p>Best regards,<br>Emad Shenouda<br>ProBook Solutions</p>
        </div>
      `
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