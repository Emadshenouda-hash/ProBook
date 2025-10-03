export interface PromoCampaign {
  code: string;
  name: string;
  description: string;
  startAtIso: string;
  endAtIso: string;
  pricing: {
    starter: { promo: number; original: number };
    growth: { promo: number; original?: number };
  };
}

export interface ActivePromo extends PromoCampaign {
  isActive: boolean;
  nowIso: string;
}

/**
 * Returns the October 2025 launch promo configuration.
 * Active from 2025-10-01 00:00:00Z to 2025-11-01 00:00:00Z (inclusive of October dates).
 */
export function getOct2025Campaign(): PromoCampaign {
  return {
    code: 'OCT2025',
    name: 'October Launch Offer',
    description: 'Limited-time October pricing when you book a consultation.',
    startAtIso: '2025-10-01T00:00:00.000Z',
    endAtIso: '2025-11-01T00:00:00.000Z',
    pricing: {
      starter: { promo: 750, original: 1000 },
      growth: { promo: 2000, original: undefined }
    }
  };
}

/**
 * Returns the currently active promo (if any). Allows env override by setting PROMO_OVERRIDE=off to force-disable.
 */
export function getActivePromo(now: Date = new Date()): ActivePromo | null {
  // Optional override to force disable in emergencies
  if (process.env.PROMO_OVERRIDE === 'off') return null;

  const campaign = getOct2025Campaign();
  const start = new Date(campaign.startAtIso).getTime();
  const end = new Date(campaign.endAtIso).getTime();
  const nowMs = now.getTime();
  const isActive = nowMs >= start && nowMs < end;
  if (!isActive) return null;

  return {
    ...campaign,
    isActive: true,
    nowIso: new Date().toISOString()
  };
}

export function msUntil(dateIso: string, now: Date = new Date()): number {
  return Math.max(0, new Date(dateIso).getTime() - now.getTime());
}

export function formatCountdown(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

