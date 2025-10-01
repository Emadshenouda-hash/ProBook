import Link from 'next/link';
import styled from '../../utils/styled';
import SEO from '../../components/SEO';

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
  const items = [
    { slug: 'saas', name: 'SaaS' },
    { slug: 'ecommerce', name: 'eCommerce' },
    { slug: 'professional-services', name: 'Professional Services' }
  ];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.com';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Industries',
      url: `${baseUrl}/industries`,
      hasPart: items.map((it) => ({ '@type': 'WebPage', name: it.name, url: `${baseUrl}/industries/${it.slug}` }))
    }
  ];
  return (
    <Section>
      <SEO title="Industries" description="Solutions tailored for SaaS, eCommerce, and Professional Services." canonicalPath="/industries" jsonLd={jsonLd} />
      <Title>Industries</Title>
      <List>
        {items.map((it) => (
          <li key={it.slug}><Link href={`/industries/${it.slug}`}>{it.name}</Link></li>
        ))}
      </List>
    </Section>
  );
}

