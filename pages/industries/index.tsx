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
  return (
    <Section>
      <SEO title="Industries" description="Solutions tailored for SaaS, eCommerce, and Professional Services." canonicalPath="/industries" />
      <Title>Industries</Title>
      <List>
        {items.map((it) => (
          <li key={it.slug}><Link href={`/industries/${it.slug}`}>{it.name}</Link></li>
        ))}
      </List>
    </Section>
  );
}

