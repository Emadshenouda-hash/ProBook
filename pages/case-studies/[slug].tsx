import { GetStaticPaths, GetStaticProps } from 'next';
import styled from '../../utils/styled';
import SEO from '../../components/SEO';
import studies from '../../public/case-studies.json';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
`;

const Meta = styled.p`
  color: #6b7280;
`;

interface Props {
  study: {
    slug: string;
    title: string;
    industry: string;
    summary: string;
    problem: string;
    approach: string;
    results: string[];
    stack: string[];
  };
}

export default function CaseStudyDetail({ study }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.com';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.title,
      about: study.industry,
      description: study.summary,
      author: { '@type': 'Organization', name: 'ProBook Solutions' },
      publisher: {
        '@type': 'Organization',
        name: 'ProBook Solutions',
        logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` }
      },
      mainEntityOfPage: `${baseUrl}/case-studies/${study.slug}`
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: `${study.title} – Case Study`,
      url: `${baseUrl}/case-studies/${study.slug}`,
      about: study.industry,
      abstract: study.summary
    }
  ];
  return (
    <Section>
      <SEO title={`${study.title} – Case Study`} description={study.summary} canonicalPath={`/case-studies/${study.slug}`} jsonLd={jsonLd} />
      <Title>{study.title}</Title>
      <Meta>{study.industry}</Meta>
      <h2>Problem</h2>
      <p>{study.problem}</p>
      <h2>Approach</h2>
      <p>{study.approach}</p>
      <h2>Results</h2>
      <ul>
        {study.results.map((r, i) => (<li key={i}>{r}</li>))}
      </ul>
      <h3>Stack</h3>
      <p>{study.stack.join(', ')}</p>
    </Section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const list: Array<{ slug: string }> = (studies as any).list || [];
  return {
    paths: list.map((s) => ({ params: { slug: s.slug } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const list: Array<any> = (studies as any).list || [];
  const study = list.find((s) => s.slug === slug);
  return { props: { study } };
};

