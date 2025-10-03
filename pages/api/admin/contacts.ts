import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../utils/auth';
import { getFirebaseDB } from '../../../utils/firebase';

function toCsv(rows: any[]): string {
  const headers = [
    'id','type','email','name','selectedPlan','promoCode','promoName','consent','unsubscribed','source','tags','utm_source','utm_medium','utm_campaign','utm_term','utm_content','createdAt'
  ];
  const esc = (v: any) => {
    if (v == null) return '';
    const s = Array.isArray(v) ? v.join('; ') : String(v);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  };
  const lines = [headers.join(',')];
  for (const r of rows) {
    const row = headers.map((h) => esc(r[h]));
    lines.push(row.join(','));
  }
  return lines.join('\n');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const db = getFirebaseDB();
  if (!db) return res.status(500).json({ ok: false, error: 'Firestore not initialized' });

  if (req.method === 'GET') {
    try {
      const { type, q, unsubscribed, limit, format, cursor, id } = req.query as any;
      // Detail mode: return single contact with events
      if (id && typeof id === 'string') {
        const doc = await db.collection('contacts').doc(id).get();
        if (!doc.exists) return res.status(404).json({ ok: false, error: 'Not found' });
        const eventsSnap = await db.collection('contacts').doc(id).collection('events').orderBy('at', 'desc').limit(50).get();
        const events = eventsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        return res.status(200).json({ ok: true, item: { id: doc.id, ...(doc.data() as any) }, events });
      }

      const take = Math.min(parseInt(limit || '500', 10) || 500, 2000);

      // Build query (admin SDK)
      let query: FirebaseFirestore.Query = db.collection('contacts').orderBy('createdAt', 'desc');
      if (cursor && typeof cursor === 'string') {
        query = query.startAfter(cursor);
      }
      query = query.limit(take);
      if (type && typeof type === 'string') {
        query = query.where('type', '==', type);
      }
      if (typeof unsubscribed === 'string') {
        const val = unsubscribed === 'true' ? true : unsubscribed === 'false' ? false : undefined;
        if (typeof val === 'boolean') {
          query = query.where('unsubscribed', '==', val);
        }
      }

      // Execute
      const snap = await query.get();
      let items = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

      // Client-side search (email/name contains)
      if (q && typeof q === 'string') {
        const needle = q.toLowerCase();
        items = items.filter((it) =>
          (it.email || '').toLowerCase().includes(needle) || (it.name || '').toLowerCase().includes(needle)
        );
      }

      if (format === 'csv') {
        const csv = toCsv(items);
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="contacts.csv"');
        return res.status(200).send(csv);
      }

      const nextCursor = items.length > 0 ? items[items.length - 1].createdAt : null;
      return res.status(200).json({ ok: true, items, nextCursor });
    } catch (e: any) {
      return res.status(500).json({ ok: false, error: e?.message || 'Failed to load contacts' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, unsubscribed, consent, tags } = req.body || {};
      if (!id) return res.status(400).json({ ok: false, error: 'Missing id' });
      const updates: Record<string, any> = {};
      if (typeof unsubscribed === 'boolean') updates.unsubscribed = unsubscribed;
      if (typeof consent === 'boolean') updates.consent = consent;
      if (Array.isArray(tags)) updates.tags = tags;
      if (Object.keys(updates).length === 0) return res.status(400).json({ ok: false, error: 'No updates provided' });
      await db.collection('contacts').doc(id).update({ ...updates, updatedAt: new Date().toISOString() });
      return res.status(200).json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ ok: false, error: e?.message || 'Update failed' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}

