import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import type { DefaultTheme } from 'styled-components';

/*
 * Breadcrumb navigation component
 *
 * This component displays the current page's path as a series of links separated
 * by slashes. It uses the Next.js router to derive the path segments and
 * react‑i18next to translate known route names. If the user is on the home
 * page there is nothing to render beyond "Home".
 */

const Nav = styled('nav')`
  font-size: 0.875rem;
  margin: 0.75rem 0;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
`;

const List = styled('ol')`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0;
  margin: 0;
`;

const Item = styled('li')`
  display: flex;
  align-items: center;

  &::after {
    content: '/';
    margin: 0 0.25rem;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  }
  &:last-child::after {
    content: '';
  }
`;

/**
 * Map URL segments to translation keys. This allows breadcrumbs to display
 * human‑readable names rather than raw path segments. Any segment that is not
 * present in this map will be capitalised and used as‑is.
 */
const segmentKeyMap: Record<string, (t: (key: string) => string) => string> = {
  about: (t) => t('header.about'),
  services: (t) => t('header.services'),
  resources: (t) => t('header.resources'),
  contact: (t) => t('header.contact'),
  portal: (t) => t('header.portal'),
};

export default function Breadcrumbs() {
  const router = useRouter();
  const { t } = useTranslation();

  // Split the current path into segments, ignoring query string and empty parts.
  const parts: string[] = (router.asPath.split('?')[0] || '')
    .split('/')
    .filter((part: string) => part.length > 0);

  // Build the breadcrumb list starting with Home.
  const breadcrumbs = parts.map((part: string, index: number) => {
    const href = '/' + parts.slice(0, index + 1).join('/');
    // Use translation key if available; otherwise capitalise the part.
    const nameFn = segmentKeyMap[part];
    const name = nameFn ? nameFn(t) : part.charAt(0).toUpperCase() + part.slice(1);
    return { name, href };
  });

  // Always include the home link at the beginning
  const items = [
    { name: t('header.home'), href: '/' },
    ...breadcrumbs,
  ];

  // If there is only Home, do not display breadcrumbs
  if (items.length <= 1) {
    return null;
  }

  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {items.map((item, idx) => (
          <Item key={idx} aria-current={idx === items.length - 1 ? 'page' : undefined}>
            {idx < items.length - 1 ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span>{item.name}</span>
            )}
          </Item>
        ))}
      </List>
    </Nav>
  );
}