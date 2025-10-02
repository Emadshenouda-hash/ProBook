import { GetStaticPaths, GetStaticProps } from 'next';
import styled from '../../utils/styled';
import SEO from '../../components/SEO';
import studies from '../../public/case-studies.json';
import { useRouter } from 'next/router';

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
  const { locale } = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.org';
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
  const title = locale === 'ar' ? (study as any).title_ar || study.title : study.title;
  const industry = locale === 'ar' ? (study as any).industry_ar || study.industry : study.industry;
  const summary = locale === 'ar' ? (study as any).summary_ar || study.summary : study.summary;
  const problem = locale === 'ar' ? (study as any).problem_ar || study.problem : study.problem;
  const approach = locale === 'ar' ? (study as any).approach_ar || study.approach : study.approach;
  const results = (locale === 'ar' ? (study as any).results_ar || study.results : study.results) as string[];
  const stack = (locale === 'ar' ? (study as any).stack_ar || study.stack : study.stack) as string[];
  return (
    <Section>
      <SEO title={`${title} – Case Study`} description={summary} canonicalPath={`/case-studies/${study.slug}`} jsonLd={jsonLd} />
      <Title>{title}</Title>
      <Meta>{industry}</Meta>
      <h2>Problem</h2>
      <p>{problem}</p>
      <h2>Approach</h2>
      <p>{approach}</p>
      <h2>Results</h2>
      <ul>
        {results.map((r, i) => (<li key={i}>{r}</li>))}
      </ul>
      <h3>Stack</h3>
      <p>{stack.join(', ')}</p>
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

