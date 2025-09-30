import styled from '../utils/styled';

const Wrap = styled('section')`
  margin: 2rem 0;
  padding: 1rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
`;

const Row = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const Badge = styled('div')`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-text);
`;

export default function TrustBadges() {
  return (
    <Wrap aria-label="Trust and certifications">
      <Row>
        <Badge aria-label="QuickBooks ProAdvisor Certified">🧾 QuickBooks ProAdvisor</Badge>
        <Badge aria-label="Xero Certified">🧮 Xero Certified</Badge>
        <Badge aria-label="Zoho Books Partner">🧰 Zoho Books Partner</Badge>
        <Badge aria-label="Secure data handling">🔐 Secure Data Handling</Badge>
        <Badge aria-label="BIMI enabled">✅ BIMI Enabled</Badge>
      </Row>
    </Wrap>
  );
}

