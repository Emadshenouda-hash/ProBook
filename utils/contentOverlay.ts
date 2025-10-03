import i18n from '../i18n';

/**
 * Fetches Firestore overrides for the current locale and overlays them on top of i18n resources.
 * Keys are stored in Firestore collection `site_content` with fields: { key, locale, value }.
 */
export async function applyContentOverlay(locale: string) {
  try {
    const res = await fetch(`/api/content-overlay?locale=${encodeURIComponent(locale)}`);
    if (!res.ok) return;
    const data = await res.json();
    const updates: Record<string, any> = data?.overrides || {};
    if (updates && Object.keys(updates).length > 0) {
      i18n.addResources(locale, 'translation', unflatten(updates));
    }
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

