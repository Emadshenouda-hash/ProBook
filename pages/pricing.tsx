import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Tier = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
`;

export default function PricingPage() {
  return (
    <Section>
      <SEO title="Pricing" description="Transparent monthly plans tailored to scope." canonicalPath="/pricing" />
      <Title>Pricing</Title>
      <Grid>
        <Tier>
          <h3>Starter</h3>
          <p>From $1,000/mo</p>
          <ul>
            <li>Bookkeeping up to 200 tx/mo</li>
            <li>Monthly close & basic reports</li>
          </ul>
          <Link href="/consultation">Get a quote</Link>
        </Tier>
        <Tier>
          <h3>Growth</h3>
          <p>$2,500–$5,000/mo</p>
          <ul>
            <li>Multi-entity or multi-channel</li>
            <li>Advanced reporting & KPIs</li>
          </ul>
          <Link href="/consultation">Get a quote</Link>
        </Tier>
        <Tier>
          <h3>Fractional CFO</h3>
          <p>Custom</p>
          <ul>
            <li>Forecasting, budgets, board decks</li>
            <li>Fundraising & cash planning</li>
          </ul>
          <Link href="/consultation">Get a quote</Link>
        </Tier>
      </Grid>
    </Section>
  );
}

