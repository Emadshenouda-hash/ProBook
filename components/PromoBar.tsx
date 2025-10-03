import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import styled from '../utils/styled';
import { getActivePromo, msUntil, formatCountdown } from '../utils/campaign';

const Bar = styled.div`
  background: linear-gradient(90deg, rgba(12,94,215,0.95), rgba(124,58,237,0.95));
  color: #fff;
  padding: 0.6rem 1rem;
  position: sticky;
  top: 0;
  z-index: 999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: center;
`;

const Copy = styled.div`
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CTA = styled(Link)`
  background: #fff;
  color: #111;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
`;

export default function PromoBar() {
  const promo = useMemo(() => getActivePromo(), []);
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    if (!promo) return;
    const tick = () => setCountdown(formatCountdown(msUntil(promo.endAtIso)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [promo]);

  if (!promo) return null;

  return (
    <Bar role="region" aria-label="Promotion">
      <Inner>
        <Copy>
          <span>🎉 October Launch Offer:</span>
          <span>Starter ${promo.pricing.starter.promo} (reg. ${promo.pricing.starter.original}) · Growth ${promo.pricing.growth.promo}</span>
          {countdown && <span>— Ends in {countdown}</span>}
        </Copy>
        <CTA href="/consultation" onClick={() => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('promo_code', promo.code);
            sessionStorage.setItem('promo_name', promo.name);
          }
        }}>Book Consultation →</CTA>
      </Inner>
    </Bar>
  );
}

