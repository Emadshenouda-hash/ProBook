import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import SEO from '../components/SEO';

const Section = styled.section`
  margin: 2rem 0;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  margin-top: 2rem;
`;

const Paragraph = styled.p`
  max-width: 800px;
  margin: 0 auto 1rem;
  line-height: 1.6;
`;

const List = styled.ul`
  max-width: 800px;
  margin: 0 auto;
  padding-inline-start: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

export default function AboutPage() {
  const { t } = useTranslation();
  const skills = t('about.skills', { returnObjects: true }) as string[];
  return (
    <Section>
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        canonicalPath={t('seo.about.path')}
      />
      <Title>{t('about.title')}</Title>
      <Subtitle>{t('about.section_title')}</Subtitle>
      <Paragraph>{t('about.description')}</Paragraph>
      <Subtitle>{t('about.skills_title')}</Subtitle>
      <List>
        {skills.map((skill, index) => (
          <ListItem key={index}>{skill}</ListItem>
        ))}
      </List>
    </Section>
  );
}