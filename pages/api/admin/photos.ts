import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../utils/auth';
import { getFromFirestore, deleteFromFirestore, deleteFromFirebase, getFirestoreDocById } from '../../../utils/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    try {
      const docs = await getFromFirestore('website_photos', 200);
      return res.status(200).json({ ok: true, items: docs });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: err?.message || 'Failed to load photos' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query as { id?: string };
      if (!id) return res.status(400).json({ ok: false, error: 'Missing id' });

      const doc = await getFirestoreDocById('website_photos', id);
      if (!doc) return res.status(404).json({ ok: false, error: 'Not found' });

      // Delete storage object first (best effort)
      if ((doc as any).path) {
        try { await deleteFromFirebase((doc as any).path); } catch {}
      }
      // Delete firestore doc
      await deleteFromFirestore('website_photos', id);

      return res.status(200).json({ ok: true });
    } catch (err: any) {
      return res.status(500).json({ ok: false, error: err?.message || 'Delete failed' });
    }
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}

