import i18n from '../i18n';
import { getFirebaseDB } from './firebase';

/**
 * Fetches Firestore overrides for the current locale and overlays them on top of i18n resources.
 * Keys are stored in Firestore collection `site_content` with fields: { key, locale, value }.
 */
export async function applyContentOverlay(locale: string) {
  try {
    const db = getFirebaseDB();
    if (!db) return;
    const snap = await db.collection('site_content').where('locale', '==', locale).get();
    if (snap.empty) return;
    const updates: Record<string, any> = {};
    snap.forEach((doc) => {
      const data = doc.data() as any;
      if (!data || typeof data.key !== 'string') return;
      updates[data.key] = data.value;
    });
    if (Object.keys(updates).length === 0) return;
    i18n.addResources(locale, 'translation', unflatten(updates));
  } catch {}
}

function unflatten(flat: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split('.');
    let curr = out;
    parts.forEach((p, idx) => {
      const isLast = idx === parts.length - 1;
      if (isLast) curr[p] = value;
      else {
        if (!(p in curr)) curr[p] = {};
        curr = curr[p];
      }
    });
  }
  return out;
}

