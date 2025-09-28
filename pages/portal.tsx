import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import SEO from '../components/SEO';

const Section = styled.section`
  margin: 2rem 0;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const Text = styled.p`
  max-width: 600px;
  margin: 0 auto 1rem;
  line-height: 1.6;
`;

export default function PortalPage() {
  const { t } = useTranslation();
  return (
    <Section>
      <SEO
        title={t('seo.portal.title')}
        description={t('seo.portal.description')}
        canonicalPath={t('seo.portal.path')}
        noindex
      />
      <Title>{t('portal.title')}</Title>
      <Text>{t('portal.intro')}</Text>
      <Text>
        {/* Placeholder for authentication logic */}
        {/* In a full implementation, you would integrate Firebase or another auth provider. */}
        Coming soon: secure login functionality.
      </Text>
    </Section>
  );
}