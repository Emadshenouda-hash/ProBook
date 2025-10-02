import Link from 'next/link';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';

const Wrap = styled('section')`
  text-align: center;
  padding: 4rem 1rem;
`;

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Wrap>
      <SEO title={t('404.title', { defaultValue: 'Page Not Found' })} description={t('404.description', { defaultValue: 'This page does not exist.' })} noindex />
      <h1>404</h1>
      <p>{t('404.body', { defaultValue: 'Sorry, we can’t find that page.' })}</p>
      <p>
        <Link href="/">{t('404.cta', { defaultValue: 'Go home' })}</Link>
      </p>
    </Wrap>
  );
}

