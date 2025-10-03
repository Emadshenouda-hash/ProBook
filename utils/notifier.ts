import { saveToFirestore } from './firebase';
import { sendEmail, sendEmailTo } from './email';
import { createEmailToken } from './tokens';

export type ContactType = 'subscriber' | 'consultation' | 'contact';

export interface NormalizedContact {
  type: ContactType;
  email: string;
  name?: string;
  selectedPlan?: string;
  promoCode?: string;
  promoName?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  message?: string;
  consent?: boolean;
  unsubscribed?: boolean;
  source?: string;
  tags?: string[];
}

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://probooksolutions.org';
}

export async function recordContact(data: NormalizedContact) {
  const email = (data.email || '').toLowerCase().trim();
  if (!email) return;
  const doc = {
    ...data,
    email,
    unsubscribed: !!data.unsubscribed,
    consent: !!data.consent,
  };
  await saveToFirestore('contacts', doc);
}

export async function notifyAdmin(data: NormalizedContact) {
  const subject = `New ${data.type} – ${data.email}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <h2>New ${data.type}</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.name ? `<p><strong>Name:</strong> ${data.name}</p>` : ''}
      ${data.selectedPlan ? `<p><strong>Plan:</strong> ${data.selectedPlan}</p>` : ''}
      ${data.promoCode ? `<p><strong>Promo:</strong> ${data.promoCode}${data.promoName ? ' (' + data.promoName + ')' : ''}</p>` : ''}
      ${data.message ? `<p><strong>Message:</strong><br/>${data.message}</p>` : ''}
      <h3>UTM</h3>
      <p>source=${data.utm_source || ''} medium=${data.utm_medium || ''} campaign=${data.utm_campaign || ''} term=${data.utm_term || ''} content=${data.utm_content || ''}</p>
    </div>
  `;
  await sendEmail(subject, html);
}

export async function sendConfirmEmail(email: string) {
  const token = createEmailToken(email, 'confirm', 60 * 60 * 24 * 3);
  const url = `${siteUrl()}/subscribe/confirm?token=${encodeURIComponent(token)}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <h2>Confirm your subscription</h2>
      <p>Click the button below to confirm your email and start receiving updates.</p>
      <p><a href="${url}" style="display:inline-block;background:#0b5ed7;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none">Confirm Email</a></p>
      <p>Or copy and paste this link into your browser:<br/>${url}</p>
    </div>
  `;
  await sendEmailTo(email, `Confirm your email – ProBook Solutions`, html);
}

export async function sendWelcomeEmail(email: string) {
  const unsubToken = createEmailToken(email, 'unsubscribe', 60 * 60 * 24 * 365 * 10);
  const unsubUrl = `${siteUrl()}/unsubscribe?token=${encodeURIComponent(unsubToken)}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
      <h2>Welcome to ProBook Solutions!</h2>
      <p>Thanks for confirming your email. You’ll now receive occasional updates and resources.</p>
      <p style="font-size:12px;color:#6b7280">Prefer not to receive emails? <a href="${unsubUrl}">Unsubscribe</a> anytime.</p>
    </div>
  `;
  await sendEmailTo(email, 'Welcome to ProBook Solutions', html);
}

