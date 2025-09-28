import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';

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
      <small>{t('footer.copyright')}</small>
    </FooterContainer>
  );
}