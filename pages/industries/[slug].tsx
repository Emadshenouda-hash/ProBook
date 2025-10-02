import { GetStaticPaths, GetStaticProps } from 'next';
import styled from '../../utils/styled';
import SEO from '../../components/SEO';

const Section = styled.section`
  margin: 2rem 0;
`;

interface Props { slug: string; name: string; painPoints: string[]; solutions: string[] }

const DATA: Record<string, Props> = {
  saas: {
    slug: 'saas',
    name: 'SaaS',
    painPoints: ['Revenue recognition', 'Churn/retention tracking', 'Budget vs actuals'],
    solutions: ['ARR/MRR dashboards', 'RevRec policy setup', 'Forecasting & runway']
  },
  ecommerce: {
    slug: 'ecommerce',
    name: 'eCommerce',
    painPoints: ['Multi-channel reconciliation', 'COGS and inventory', 'Sales tax compliance'],
    solutions: ['Channel integrations', 'Inventory & COGS methodology', 'Nexus assessment & filings']
  },
  'professional-services': {
    slug: 'professional-services',
    name: 'Professional Services',
    painPoints: ['Time tracking & WIP', 'Cash flow variability', 'Utilization metrics'],
    solutions: ['Project accounting', 'AR collections cadence', 'Utilization dashboards']
  }
};

export default function IndustryPage({ slug, name, painPoints, solutions }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.org';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${name} – Industry Solutions`,
      url: `${baseUrl}/industries/${slug}`,
      about: name
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${name} Pain Points and Solutions`,
      itemListElement: [
        ...painPoints.map((p, idx) => ({ '@type': 'ListItem', position: idx + 1, name: p })),
        ...solutions.map((s, idx) => ({ '@type': 'ListItem', position: painPoints.length + idx + 1, name: s }))
      ]
    }
  ];
  return (
    <Section>
      <SEO title={`${name} – Industry Solutions`} description={`Tailored finance and accounting for ${name}.`} canonicalPath={`/industries/${slug}`} jsonLd={jsonLd} />
      <h1>{name}</h1>
      <h2>Pain Points</h2>
      <ul>{painPoints.map((p) => (<li key={p}>{p}</li>))}</ul>
      <h2>What we deliver</h2>
      <ul>{solutions.map((s) => (<li key={s}>{s}</li>))}</ul>
    </Section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: Object.keys(DATA).map((slug) => ({ params: { slug } })), fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  return { props: DATA[slug] } as any;
};

