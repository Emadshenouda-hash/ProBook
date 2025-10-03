import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyEmailToken } from '../../utils/tokens';
import { saveToFirestore } from '../../utils/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query as { token?: string };
  if (!token) return res.status(400).send('Missing token');

  const verified = verifyEmailToken(token, 'unsubscribe');
  if (!verified) return res.status(400).send('Invalid or expired token');
  const email = verified.email;
  try {
    await saveToFirestore('contacts', {
      type: 'subscriber',
      email,
      unsubscribed: true,
      source: 'unsubscribe_link'
    });
  } catch {}
  return res.status(200).send('You have been unsubscribed.');
}

