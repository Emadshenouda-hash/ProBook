import styled from '../utils/styled';
import SEO from '../components/SEO';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import type { DefaultTheme } from 'styled-components';

const Section = styled.section`
  margin: 2rem 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin-bottom: 3rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Tier = styled.div<{ featured?: boolean }>`
  background: var(--color-surface);
  border: ${({ featured }: { featured?: boolean }) => featured ? `3px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}` : '1px solid var(--color-border)'};
  border-radius: 12px;
  padding: 2rem;
  padding-top: ${({ featured }: { featured?: boolean }) => featured ? '3rem' : '2rem'};
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 600px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: #fff;
  padding: 0.4rem 1.25rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(109, 40, 217, 0.3);
  z-index: 10;
`;

const TierName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
`;

const TierPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const TierPeriod = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  margin-bottom: 1.5rem;
`;

const TierDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex: 1;
`;

const FeatureItem = styled.li<{ included?: boolean }>`
  padding: 0.75rem 0;
  display: flex;
  align-items: start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${({ included }: { included?: boolean }) => included ? 'inherit' : '#999'};
  text-decoration: ${({ included }: { included?: boolean }) => included ? 'none' : 'line-through'};
  
  &:before {
    content: '${({ included }: { included?: boolean }) => included ? '✓' : '×'}';
    color: ${({ included, theme }: { included?: boolean; theme: DefaultTheme }) => included ? theme.colors.primary : '#999'};
    font-weight: 700;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
`;

const CTAButton = styled(Link)<{ variant?: string }>`
  display: block;
  text-align: center;
  padding: 0.75rem 1.5rem;
  background: ${({ variant, theme }: { variant?: string; theme: DefaultTheme }) => 
    variant === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ variant, theme }: { variant?: string; theme: DefaultTheme }) => 
    variant === 'primary' ? '#fff' : theme.colors.primary};
  border: 2px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  margin-top: auto;
  
  &:hover {
    background: ${({ variant, theme }: { variant?: string; theme: DefaultTheme }) => 
      variant === 'primary' ? theme.colors.primaryHover : theme.colors.primary};
    color: #fff;
    transform: translateY(-2px);
  }
`;

const ComparisonTable = styled.div`
  margin-top: 4rem;
  overflow-x: auto;
`;

const TableTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--color-surface);
  border-radius: 12px;
  overflow: hidden;
`;

const Th = styled.th`
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--color-border);
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, rgba(109, 40, 217, 0.05), rgba(14, 165, 233, 0.05));
  border-left: 4px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  padding: 1.5rem;
  border-radius: 8px;
  margin: 3rem 0;
`;

const FAQSection = styled.div`
  margin-top: 4rem;
`;

const FAQTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const FAQItem = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const Question = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
`;

const Answer = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

export default function PricingPage() {
  const { t } = useTranslation();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://probooksolutions.org';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I know which plan I need?',
          acceptedAnswer: { '@type': 'Answer', text: 'It depends on your transaction volume, entities, and advisory needs. We help you pick on a free consultation.' }
        },
        {
          '@type': 'Question',
          name: 'Can I switch plans later?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can upgrade or adjust as your needs evolve. Month-to-month with 30 days\' notice.' }
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: 'Accounting Service Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '1000',
          priceCurrency: 'USD',
          url: `${baseUrl}/pricing#starter`,
          itemOffered: { '@type': 'Service', name: 'Bookkeeping Services' },
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Growth',
          price: '2500',
          priceCurrency: 'USD',
          url: `${baseUrl}/pricing#growth`,
          itemOffered: { '@type': 'Service', name: 'Advanced Accounting & Reporting' },
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Fractional CFO',
          price: '0',
          priceCurrency: 'USD',
          url: `${baseUrl}/pricing#cfo`,
          itemOffered: { '@type': 'Service', name: 'Fractional CFO Advisory' },
          availability: 'https://schema.org/LimitedAvailability',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: 0,
            priceCurrency: 'USD',
            description: 'Custom engagement; schedule a call for tailored quote.'
          }
        }
      ]
    }
  ];
  
  return (
    <Section>
      <SEO 
        title={t('seo.pricing.title', { defaultValue: 'Pricing - ProBook Solutions' })}
        description={t('seo.pricing.description', { defaultValue: 'Transparent pricing for bookkeeping, financial reporting, and fractional CFO services. Plans starting at $1,000/month for startups and SMEs.' })}
        canonicalPath={t('seo.pricing.path', { defaultValue: '/pricing' })}
        jsonLd={jsonLd}
      />
      <Title>{t('pricing.title', { defaultValue: 'Transparent Pricing' })}</Title>
      <Subtitle>
        {t('pricing.subtitle', { defaultValue: 'Choose a plan that fits your business stage and complexity. All plans include secure data handling, monthly reports, and dedicated support.' })}
      </Subtitle>

      <Grid>
        <Tier>
          <TierName>{t('pricing.starter.name', { defaultValue: 'Starter' })}</TierName>
          <TierPrice>$1,000</TierPrice>
          <TierPeriod>{t('common.per_month', { defaultValue: 'per month' })}</TierPeriod>
          <TierDescription>
            {t('pricing.starter.description', { defaultValue: 'Perfect for early-stage startups and small businesses with straightforward accounting needs.' })}
          </TierDescription>
          <FeaturesList>
            <FeatureItem included>{t('pricing.features.transactions', { defaultValue: 'Bookkeeping up to 200 transactions/month' })}</FeatureItem>
            <FeatureItem included>{t('pricing.features.bank_reconciliation', { defaultValue: 'Bank & credit card reconciliation' })}</FeatureItem>
            <FeatureItem included>{t('pricing.features.pl_bs', { defaultValue: 'Monthly P&L and Balance Sheet' })}</FeatureItem>
            <FeatureItem included>{t('pricing.features.quickbooks', { defaultValue: 'QuickBooks Online or Desktop' })}</FeatureItem>
            <FeatureItem included>{t('pricing.features.ap_ar', { defaultValue: 'AP/AR management' })}</FeatureItem>
            <FeatureItem included>{t('pricing.features.email_support', { defaultValue: 'Email support (24-48 hr response)' })}</FeatureItem>
            <FeatureItem included={false}>{t('pricing.features.multi_entity', { defaultValue: 'Multi-entity or multi-currency' })}</FeatureItem>
            <FeatureItem included={false}>{t('pricing.features.dashboards', { defaultValue: 'Custom dashboards or KPIs' })}</FeatureItem>
            <FeatureItem included={false}>{t('pricing.features.cfo_advisory', { defaultValue: 'CFO advisory services' })}</FeatureItem>
          </FeaturesList>
          <CTAButton href="/consultation">Get Started</CTAButton>
        </Tier>

        <Tier featured>
          <FeaturedBadge>{t('pricing.growth.badge', { defaultValue: 'Most Popular' })}</FeaturedBadge>
          <TierName>{t('pricing.growth.name', { defaultValue: 'Growth' })}</TierName>
          <TierPrice>$2,500+</TierPrice>
          <TierPeriod>{t('common.per_month', { defaultValue: 'per month' })}</TierPeriod>
          <TierDescription>
            {t('pricing.growth.description', { defaultValue: 'For growing companies with multiple revenue streams, inventory, or international operations.' })}
          </TierDescription>
          <FeaturesList>
            <FeatureItem included>Bookkeeping up to 500 transactions/month</FeatureItem>
            <FeatureItem included>Multi-entity or multi-currency support</FeatureItem>
            <FeatureItem included>E-commerce integration (Shopify, Amazon, etc.)</FeatureItem>
            <FeatureItem included>Inventory management (DEAR, QuickBooks)</FeatureItem>
            <FeatureItem included>Custom financial reports and KPIs</FeatureItem>
            <FeatureItem included>Budgeting and variance analysis</FeatureItem>
            <FeatureItem included>Priority support (12-24 hr response)</FeatureItem>
            <FeatureItem included>Quarterly business reviews</FeatureItem>
            <FeatureItem included={false}>Board decks or investor reporting</FeatureItem>
          </FeaturesList>
          <CTAButton href="/consultation" variant="primary">Get Started</CTAButton>
        </Tier>

        <Tier>
          <TierName>{t('pricing.cfo.name', { defaultValue: 'Fractional CFO' })}</TierName>
          <TierPrice>{t('pricing.cfo.price', { defaultValue: 'Custom' })}</TierPrice>
          <TierPeriod>{t('pricing.cfo.period', { defaultValue: 'tailored to your needs' })}</TierPeriod>
          <TierDescription>
            {t('pricing.cfo.description', { defaultValue: 'Strategic financial leadership for scaling businesses, fundraising, or M&A.' })}
          </TierDescription>
          <FeaturesList>
            <FeatureItem included>Everything in Growth plan</FeatureItem>
            <FeatureItem included>Financial modeling and forecasting</FeatureItem>
            <FeatureItem included>Cash flow planning and runway analysis</FeatureItem>
            <FeatureItem included>Board reporting and investor decks</FeatureItem>
            <FeatureItem included>Fundraising support (Series A/B prep)</FeatureItem>
            <FeatureItem included>Due diligence assistance</FeatureItem>
            <FeatureItem included>Strategic planning and scenario analysis</FeatureItem>
            <FeatureItem included>Weekly or bi-weekly check-ins</FeatureItem>
            <FeatureItem included>Direct phone/Slack access</FeatureItem>
          </FeaturesList>
          <CTAButton href="/consultation">Schedule a Call</CTAButton>
        </Tier>
      </Grid>

      <InfoBox>
        <strong>Not sure which plan is right for you?</strong><br />
        Book a free 20-minute consultation and we'll recommend a plan based on your transaction volume, complexity, and goals. All plans can be customized with add-ons.
      </InfoBox>

      <ComparisonTable>
      <TableTitle>{t('pricing.comparison_title', { defaultValue: 'Detailed Feature Comparison' })}</TableTitle>
        <Table>
          <thead>
            <tr>
              <Th>{t('pricing.feature', { defaultValue: 'Feature' })}</Th>
              <Th>{t('pricing.starter_plan', { defaultValue: 'Starter' })}</Th>
              <Th>{t('pricing.growth_plan', { defaultValue: 'Growth' })}</Th>
              <Th>{t('pricing.cfo_plan', { defaultValue: 'Fractional CFO' })}</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td><strong>{t('pricing.monthly_transactions', { defaultValue: 'Monthly Transactions' })}</strong></Td>
              <Td>{t('pricing.up_to', { defaultValue: 'Up to' })} 200</Td>
              <Td>{t('pricing.up_to', { defaultValue: 'Up to' })} 500</Td>
              <Td>{t('pricing.unlimited', { defaultValue: 'Unlimited' })}</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.bank_reconciliation', { defaultValue: 'Bank Reconciliation' })}</strong></Td>
              <Td>✓</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.pl_balance_sheet', { defaultValue: 'P&L & Balance Sheet' })}</strong></Td>
              <Td>✓</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.cash_flow_statement', { defaultValue: 'Cash Flow Statement' })}</strong></Td>
              <Td>{t('pricing.on_request', { defaultValue: 'On request' })}</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.multi_entity_support', { defaultValue: 'Multi-Entity Support' })}</strong></Td>
              <Td>{t('pricing.add_on', { defaultValue: 'Add-on' })}</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.multi_currency', { defaultValue: 'Multi-Currency' })}</strong></Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.ecommerce_integration', { defaultValue: 'E-commerce Integration' })}</strong></Td>
              <Td>{t('pricing.add_on', { defaultValue: 'Add-on' })}</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.inventory_management', { defaultValue: 'Inventory Management' })}</strong></Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.custom_kpi_dashboards', { defaultValue: 'Custom KPI Dashboards' })}</strong></Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>✓</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.budgeting_forecasting', { defaultValue: 'Budgeting & Forecasting' })}</strong></Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>{t('pricing.basic', { defaultValue: 'Basic' })}</Td>
              <Td>{t('pricing.advanced', { defaultValue: 'Advanced' })}</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.board_investor_reporting', { defaultValue: 'Board/Investor Reporting' })}</strong></Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.fundraising_support', { defaultValue: 'Fundraising Support' })}</strong></Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>{t('pricing.not_included', { defaultValue: '—' })}</Td>
              <Td>✓</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.response_time', { defaultValue: 'Response Time' })}</strong></Td>
              <Td>24-48 {t('pricing.hours', { defaultValue: 'hours' })}</Td>
              <Td>12-24 {t('pricing.hours', { defaultValue: 'hours' })}</Td>
              <Td>{t('pricing.same_day', { defaultValue: 'Same day' })}</Td>
            </tr>
            <tr>
              <Td><strong>{t('pricing.checkins', { defaultValue: 'Check-ins' })}</strong></Td>
              <Td>{t('pricing.monthly', { defaultValue: 'Monthly' })}</Td>
              <Td>{t('pricing.quarterly', { defaultValue: 'Quarterly' })}</Td>
              <Td>{t('pricing.weekly_biweekly', { defaultValue: 'Weekly/Bi-weekly' })}</Td>
            </tr>
          </tbody>
        </Table>
      </ComparisonTable>

      <FAQSection>
        <FAQTitle>Pricing FAQs</FAQTitle>
        
        <FAQItem>
          <Question>How do I know which plan I need?</Question>
          <Answer>
            It depends on your monthly transaction volume, number of entities, and whether you need strategic advisory. Most startups with &lt;$1M revenue start with Starter or Growth. If you're fundraising or need board-level financial leadership, consider Fractional CFO. We'll help you decide on the consultation call.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What counts as a "transaction"?</Question>
          <Answer>
            A transaction is any entry in your books: an invoice, bill, bank deposit, credit card charge, journal entry, or payroll run. We count unique line items (e.g., a bill with 5 line items = 5 transactions).
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Can I switch plans later?</Question>
          <Answer>
            Yes! As your business grows, we can upgrade you to a higher tier. If your volume decreases, we can adjust downward too. Plans are month-to-month with 30 days' notice to cancel or change.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What if I exceed my transaction limit?</Question>
          <Answer>
            We'll notify you if you approach your limit. Additional transactions are billed at $5 per 10 transactions, or we can upgrade you to the next tier if it's more cost-effective.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Do you offer one-time cleanup projects?</Question>
          <Answer>
            Yes! If your books are behind or messy, we offer one-time cleanup projects starting at $2,500. We'll audit your books, fix discrepancies, and get you caught up. Contact us for a quote.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What software do I need?</Question>
          <Answer>
            We work with QuickBooks (Desktop or Online), Xero, Zoho Books, and NetSuite. If you don't have software yet, we'll recommend the best fit during onboarding (typically included in setup).
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Are there setup fees?</Question>
          <Answer>
            First-month setup (chart of accounts design, data migration, integrations) is typically $500-$1,500 depending on complexity. We'll quote this upfront after reviewing your current state.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What's your cancellation policy?</Question>
          <Answer>
            Month-to-month contracts with 30 days' written notice. No long-term lock-in. Upon termination, we'll provide a clean handoff with all files and documentation.
          </Answer>
        </FAQItem>
        <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.9rem' }}>
          {t('disclaimers.not_legal_tax', { defaultValue: 'Information provided here is for general guidance and is not legal or tax advice.' })}
        </p>
      </FAQSection>

      <InfoBox style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h3 style={{ marginTop: 0 }}>Ready to Get Started?</h3>
        <p>Book a free consultation to discuss your needs and get a customized quote.</p>
        <CTAButton href="/consultation" variant="primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Schedule Your Consultation
        </CTAButton>
      </InfoBox>
    </Section>
  );
}

