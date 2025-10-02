import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import type { DefaultTheme } from 'styled-components';
import { StaggerChildren, ItemUp } from '../components/Animate';
import SEO from '../components/SEO';
import Link from 'next/link';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const ArticlesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const ArticleCard = styled.div`
  padding: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  transition: transform ${({ theme }: { theme: DefaultTheme }) => theme.transitions.fast}, box-shadow ${({ theme }: { theme: DefaultTheme }) => theme.transitions.fast};
  will-change: transform;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ArticleTitle = styled.h3`
  margin-top: 0;
`;

const ArticleSnippet = styled.p`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

export default function ResourcesPage() {
  const { t } = useTranslation();
  const articles = t('resources.articles', { returnObjects: true }) as Array<{ title: string; snippet: string }>;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.org';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resources',
      url: `${baseUrl}/resources`,
      hasPart: articles.map((a) => ({ '@type': 'Article', headline: a.title }))
    }
  ];
  return (
    <Section>
      <SEO
        title={t('seo.resources.title')}
        description={t('seo.resources.description')}
        canonicalPath={t('seo.resources.path')}
        jsonLd={jsonLd}
      />
      <Title>{t('resources.title')}</Title>
      <Intro>{t('resources.intro')}</Intro>
      <StaggerChildren>
        <ArticlesGrid>
          {articles.map((article, idx) => (
            <ItemUp key={idx}>
              <ArticleCard>
                <ArticleTitle>{article.title}</ArticleTitle>
                <ArticleSnippet>{article.snippet}</ArticleSnippet>
                <div>
                  <Link href="/case-studies">View Case Studies</Link> · <Link href="/consultation">{t('cta.book_consultation')}</Link>
                </div>
              </ArticleCard>
            </ItemUp>
          ))}
        </ArticlesGrid>
      </StaggerChildren>
    </Section>
  );
}