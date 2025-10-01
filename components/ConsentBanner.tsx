import React from 'react';
import styled from '../utils/styled';
import { useConsent } from '../context/ConsentContext';

const Banner = styled('div')`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--color-surface);
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
  padding: 1rem;
  box-shadow: 0 -4px 16px rgba(0,0,0,0.06);
`;

const Text = styled('div')`
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Actions = styled('div')`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const Button = styled('button')`
  appearance: none;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.5rem 0.875rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`;

const Primary = styled(Button)`
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  border-color: transparent;
`;

export default function ConsentBanner() {
  const { isDecided, acceptAll, rejectAll, setConsent, consent } = useConsent();
  const [analytics, setAnalytics] = React.useState<boolean>(consent.analytics);
  const [marketing, setMarketing] = React.useState<boolean>(consent.marketing);

  React.useEffect(() => {
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
  }, [consent]);

  if (isDecided) return null;

  return (
    <Banner role="dialog" aria-label="Cookie consent">
      <Text>
        We use cookies to enhance your experience. Necessary cookies run by default. You can choose to enable analytics and marketing cookies. See our Privacy Policy for details.
      </Text>
      <Actions>
        <Button onClick={rejectAll} aria-label="Reject optional cookies">Reject all</Button>
        <Button
          onClick={() => setConsent({ necessary: true, analytics, marketing })}
          aria-label="Save cookie preferences"
        >
          Save choices
        </Button>
        <Primary onClick={acceptAll} aria-label="Accept all cookies">Accept all</Primary>
      </Actions>
    </Banner>
  );
}

