import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import type { DefaultTheme } from 'styled-components';
import Image from 'next/image';

const Wrap = styled('section')`
  padding: 1.25rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
`;

const Container = styled('div')`
  max-width: ${({ theme }: { theme: DefaultTheme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled('span')`
  font-size: 0.9rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const List = styled('ul')`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  flex: 1;
`;

const Item = styled('li')`
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  opacity: 0.7;
  text-align: center;
`;

export default function LogosBar() {
  const { t } = useTranslation();
  // Map to SVGs in /public/logos (placeholder names)
  const logos: Array<{ src: string; alt: string }> = [
    { src: '/logos/quickbooks.svg', alt: 'QuickBooks' },
    { src: '/logos/xero.svg', alt: 'Xero' },
    { src: '/logos/zoho-books.svg', alt: 'Zoho Books' },
    { src: '/logos/netsuite.svg', alt: 'NetSuite' }
  ];
  return (
    <Wrap aria-label={t('home.logos_title')}>
      <Container>
        <Title>{t('home.logos_title')}</Title>
        <List>
          {logos.map((logo, idx) => (
            <Item key={idx} aria-label={logo.alt}>
              <Image src={logo.src} alt={logo.alt} width={120} height={32} />
            </Item>
          ))}
        </List>
      </Container>
    </Wrap>
  );
}

