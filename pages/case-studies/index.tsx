import Link from 'next/link';
import styled from '../../utils/styled';
import SEO from '../../components/SEO';
import studies from '../../public/case-studies.json';
import { useTranslation } from 'react-i18next';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Card = styled.article`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1rem;
`;

export default function CaseStudiesIndex() {
  const { t } = useTranslation();
  const list: Array<{ slug: string; title: string; summary: string; industry: string } > = (studies as any).list || [];
  return (
    <Section>
      <SEO title={t('case_studies.title', { defaultValue: 'Case Studies' })} description={t('case_studies.description', { defaultValue: 'Selected client engagements and outcomes.' })} canonicalPath="/case-studies" />
      <Title>{t('case_studies.title', { defaultValue: 'Case Studies' })}</Title>
      <Grid>
        {list.map((cs) => (
          <Card key={cs.slug}>
            <h3 style={{ marginTop: 0 }}>{cs.title}</h3>
            <p style={{ color: '#6b7280', marginTop: 0 }}>{cs.industry}</p>
            <p>{cs.summary}</p>
            <Link href={`/case-studies/${cs.slug}`}>{t('case_studies.read_more', { defaultValue: 'Read more' })}</Link>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

