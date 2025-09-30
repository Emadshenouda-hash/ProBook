import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import type { DefaultTheme } from 'styled-components';
import { StaggerChildren, ItemUp } from '../components/Animate';
import SEO from '../components/SEO';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const Card = styled.div`
  padding: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  transition: transform ${({ theme }: { theme: DefaultTheme }) => theme.transitions.fast}, box-shadow ${({ theme }: { theme: DefaultTheme }) => theme.transitions.fast};
  will-change: transform;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  }
`;

const CardTitle = styled.h3`
  margin-top: 0;
`;

const CardDesc = styled.p`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const CTAWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const CTAButton = styled.a`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primaryHover};
  }
`;

const FAQSection = styled.section`
  margin-top: 3rem;
`;

const FAQTitle = styled.h2`
  text-align: center;
`;

const FAQList = styled.dl`
  max-width: 800px;
  margin: 1rem auto 0;
`;

const FAQItem = styled.div`
  border-top: 1px solid var(--color-border);
  padding: 1rem 0;
  dt {
    font-weight: 700;
  }
  dd {
    margin: 0;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  }
`;

export default function ServicesPage() {
  const { t } = useTranslation();
  const services = t('services.list', { returnObjects: true }) as Array<{ title: string; description: string }>;
  const faq = t('services.faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('services.title'),
      areaServed: 'Global',
      provider: {
        '@type': 'Organization',
        name: 'ProBook Solutions'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a }
      }))
    }
  ];
  return (
    <Section>
      <SEO
        title={t('seo.services.title')}
        description={t('seo.services.description')}
        canonicalPath={t('seo.services.path')}
        jsonLd={jsonLd}
        ogType="website"
        ogImage={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/og?title=${encodeURIComponent(t('seo.services.title') as string)}&subtitle=${encodeURIComponent('ProBook Solutions')}`}
      />
      <Title>{t('services.title')}</Title>
      <Description>{t('services.intro')}</Description>
      <StaggerChildren>
        <ServicesGrid>
          {services.map((svc, idx) => (
            <ItemUp key={idx}>
              <Card>
                <CardTitle>{svc.title}</CardTitle>
                <CardDesc>{svc.description}</CardDesc>
              </Card>
            </ItemUp>
          ))}
        </ServicesGrid>
      </StaggerChildren>
      <CTAWrapper>
        <Link href="/consultation" passHref legacyBehavior>
          <CTAButton>{t('cta.book_consultation')}</CTAButton>
        </Link>
      </CTAWrapper>

      <FAQSection>
        <FAQTitle>{t('services.faq.title')}</FAQTitle>
        <FAQList>
          {faq.map((item, idx) => (
            <FAQItem key={idx}>
              <dt style={{ fontWeight: 700 }}>{item.q}</dt>
              <dd style={{ margin: 0, color: '#6b7280' }}>{item.a}</dd>
            </FAQItem>
          ))}
        </FAQList>
      </FAQSection>
    </Section>
  );
}