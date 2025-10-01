export type AnalyticsEvent =
  | { name: 'cta_click'; label?: string; href?: string }
  | { name: 'form_submit'; form: 'contact' | 'consultation' }
  | { name: 'chat_open' };

function gtag(...args: any[]) {
  try {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.gtag) window.gtag(...args);
  } catch {}
}

export function track(event: AnalyticsEvent) {
  try {
    // Respect consent: only emit when analytics is allowed
    if (typeof window !== 'undefined' && (window as any).__consent && !(window as any).__consent.analytics) {
      return;
    }
    if (event.name === 'cta_click') {
      gtag('event', 'select_content', { content_type: 'cta', item_id: event.label || event.href || 'cta' });
    } else if (event.name === 'form_submit') {
      gtag('event', 'generate_lead', { method: event.form });
    } else if (event.name === 'chat_open') {
      gtag('event', 'engagement', { type: 'chat_open' });
    }
  } catch {}
}

