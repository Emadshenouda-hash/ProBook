import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import Link from 'next/link';

const FooterContainer = styled('footer')`
  text-align: center;
  padding: 1rem;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
`;

export default function Footer() {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <small>
        {t('footer.copyright')} · <Link href="/privacy">Privacy</Link>
      </small>
    </FooterContainer>
  );
}