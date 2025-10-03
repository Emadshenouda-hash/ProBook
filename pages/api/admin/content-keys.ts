import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../utils/auth';
import en from '../../../locales/en.json';
import ar from '../../../locales/ar.json';
import { getFirebaseDB } from '../../../utils/firebase';

function flatten(obj: any, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  Object.keys(obj || {}).forEach((k) => {
    const val = (obj as any)[k];
    const path = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(out, flatten(val, path));
    } else {
      out[path] = String(val);
    }
  });
  return out;
}

function docId(locale: string, key: string): string {
  const b64 = Buffer.from(key).toString('base64').replace(/=+$/,'').replace(/\+/g,'-').replace(/\//g,'_');
  return `${locale}__${b64}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = await requireAdmin(req, res);
  if (!admin) return;

  const locale = ((req.method === 'GET' ? (req.query.locale as string) : req.body?.locale) || 'en').toLowerCase();
  const base = locale === 'ar' ? flatten(ar as any) : flatten(en as any);
  const q = (req.method === 'GET' ? (req.query.q as string) : '') || '';
  const onlyOverridden = req.method === 'GET' && req.query.overridden === 'true';

  const db = getFirebaseDB();
  if (!db) return res.status(500).json({ ok: false, error: 'Firestore not initialized' });

  if (req.method === 'GET') {
    try {
      const snap = await db.collection('site_content').where('locale', '==', locale).get();
      const overrides: Record<string, any> = {};
      snap.forEach((d) => { const data = d.data() as any; overrides[data.key] = data.value; });
      const keysSet = new Set<string>([...Object.keys(base), ...Object.keys(overrides)]);
      let keys = Array.from(keysSet);
      if (q) {
        const needle = q.toLowerCase();
        keys = keys.filter((k) => k.toLowerCase().includes(needle) || (base[k] || '').toLowerCase().includes(needle) || (String(overrides[k] || '')).toLowerCase().includes(needle));
      }
      if (onlyOverridden) {
        keys = keys.filter((k) => overrides[k] !== undefined && overrides[k] !== null && overrides[k] !== '');
      }
      keys.sort();
      const items = keys.map((k) => ({ key: k, defaultValue: base[k] || '', overrideValue: overrides[k] ?? null }));
      return res.status(200).json({ ok: true, items });
    } catch (e: any) {
      return res.status(500).json({ ok: false, error: e?.message || 'Failed to load keys' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { key, value } = req.body || {};
      if (!key || typeof key !== 'string') return res.status(400).json({ ok: false, error: 'Missing key' });
      const id = docId(locale, key);
      const ref = db.collection('site_content').doc(id);
      if (value === null || value === undefined || value === '') {
        // Clear override
        await ref.delete().catch(() => {});
        return res.status(200).json({ ok: true, cleared: true });
      }
      await ref.set({ key, locale, value, updatedAt: new Date().toISOString() }, { merge: true });
      return res.status(200).json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ ok: false, error: e?.message || 'Update failed' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}

