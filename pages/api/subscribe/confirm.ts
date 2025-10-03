import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyEmailToken } from '../../../utils/tokens';
import { saveToFirestore } from '../../../utils/firebase';
import { sendWelcomeEmail } from '../../../utils/notifier';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query as { token?: string };
  if (!token) return res.status(400).send('Missing token');

  const verified = verifyEmailToken(token, 'confirm');
  if (!verified) return res.status(400).send('Invalid or expired token');

  const email = verified.email;
  try {
    await saveToFirestore('contacts', {
      type: 'subscriber',
      email,
      consent: true,
      unsubscribed: false,
      source: 'double_opt_in'
    });
    await sendWelcomeEmail(email);
  } catch {
    // ignore
  }

  return res.status(200).send('Email confirmed. Thank you!');
}

