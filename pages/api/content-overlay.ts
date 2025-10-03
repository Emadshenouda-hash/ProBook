import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirebaseDB } from '../../utils/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { locale } = req.query as { locale?: string };
    const loc = (locale || 'en').toLowerCase();
    const db = getFirebaseDB();
    if (!db) return res.status(200).json({ overrides: {} });
    const snap = await db.collection('site_content').where('locale', '==', loc).get();
    const overrides: Record<string, any> = {};
    snap.forEach((doc) => {
      const data = doc.data() as any;
      if (!data || typeof data.key !== 'string') return;
      overrides[data.key] = data.value;
    });
    return res.status(200).json({ overrides });
  } catch (e) {
    return res.status(200).json({ overrides: {} });
  }
}

