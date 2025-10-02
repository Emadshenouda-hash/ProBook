import Link from 'next/link';
import styled from '../../utils/styled';
import SEO from '../../components/SEO';
import { useTranslation } from 'react-i18next';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  max-width: 800px;
  margin: 0 auto;
`;

export default function IndustriesIndex() {
  const { t } = useTranslation();
  const items = [
    { slug: 'saas', name: t('industries.saas', { defaultValue: 'SaaS' }) },
    { slug: 'ecommerce', name: t('industries.ecommerce', { defaultValue: 'eCommerce' }) },
    { slug: 'professional-services', name: t('industries.professional_services', { defaultValue: 'Professional Services' }) }
  ];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.org';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: t('industries.title', { defaultValue: 'Industries' }),
      url: `${baseUrl}/industries`,
      hasPart: items.map((it) => ({ '@type': 'WebPage', name: it.name, url: `${baseUrl}/industries/${it.slug}` }))
    }
  ];
  return (
    <Section>
      <SEO title={t('industries.title', { defaultValue: 'Industries' })} description={t('industries.description', { defaultValue: 'Solutions tailored for SaaS, eCommerce, and Professional Services.' })} canonicalPath="/industries" jsonLd={jsonLd} />
      <Title>{t('industries.title', { defaultValue: 'Industries' })}</Title>
      <List>
        {items.map((it) => (
          <li key={it.slug}><Link href={`/industries/${it.slug}`}>{it.name}</Link></li>
        ))}
      </List>
    </Section>
  );
}

