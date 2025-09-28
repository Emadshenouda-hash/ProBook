import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import { motion } from 'framer-motion';
import type { DefaultTheme } from 'styled-components';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

// Use framer-motion to animate the navbar on load
const NavContainer = styled(motion.nav)`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  backdrop-filter: saturate(1.2) blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: padding 200ms ease, background-color 0.3s ease, border-color 0.3s ease;
  &.compact {
    padding: 0.4rem 1rem;
  }
  /* Slightly increase opacity when over the hero */
  &.on-hero {
    background-color: ${({ theme }) => theme.colors.surface};
  }
  @media (max-width: 768px) {
    position: relative;
  }
`;

const NavLinks = styled('ul')<{ open?: boolean }>`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
  /* On small screens hide links until the menu is toggled */
  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: saturate(1.2) blur(8px);
    border-bottom: 1px solid #e5e7eb;
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    display: ${({ open }) => (open ? 'flex' : 'none')};
    z-index: 99;
  }
`;

const NavLinkItem = styled('li')``;

const StyledLink = styled('a')<{ active?: boolean; dark?: boolean }>`
  text-decoration: none;
  color: ${({ active, dark, theme }: { active?: boolean; dark?: boolean; theme: DefaultTheme }) =>
    dark ? (active ? '#ffffff' : 'rgba(255,255,255,0.92)') : (active ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ active }: { active?: boolean }) => (active ? 'bold' : 'normal')};
  &:hover {
    color: ${({ dark, theme }: { dark?: boolean; theme: DefaultTheme }) => (dark ? '#ffffff' : theme.colors.primary)};
  }
`;

// Gradient text for the site name to make it stand out and feel modern.
const SiteName = styled('span')`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1;
  background: linear-gradient(90deg, #0b5ed7 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const CTAButton = styled('a')`
  padding: 0.5rem 0.9rem;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: ${({ theme }: { theme: DefaultTheme }) => theme.shadows.sm};
  &:hover {
    background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primaryHover};
  }
`;

// Button used on small screens to toggle the mobile navigation
const HamburgerButton = styled('button')`
  display: none;
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pathname } = router;
  const [compact, setCompact] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const onHero = pathname === '/' && !compact;

  React.useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <NavContainer
      role="navigation"
      aria-label={t('header.language', { defaultValue: 'Main' })}
      className={`${compact ? 'compact' : ''} ${onHero ? 'on-hero' : ''}`}
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="/" passHref legacyBehavior>
        <StyledLink
          active={pathname === '/'}
          dark={false}
          aria-label={`${t('seo.siteName', { defaultValue: 'ProBook Solutions' })} home`}
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Logo size={24} />
            <SiteName>{t('seo.siteName', { defaultValue: 'ProBook Solutions' })}</SiteName>
          </div>
        </StyledLink>
      </Link>
      <NavLinks id="primary-navigation" open={menuOpen}>
        <NavLinkItem>
          <Link href="/" passHref legacyBehavior>
            <StyledLink active={pathname === '/'} dark={false} aria-current={pathname === '/' ? 'page' : undefined}>
              {t('header.home')}
            </StyledLink>
          </Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link href="/about" passHref legacyBehavior>
            <StyledLink active={pathname === '/about'} dark={false} aria-current={pathname === '/about' ? 'page' : undefined}>
              {t('header.about')}
            </StyledLink>
          </Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link href="/services" passHref legacyBehavior>
            <StyledLink active={pathname === '/services'} dark={false} aria-current={pathname === '/services' ? 'page' : undefined}>
              {t('header.services')}
            </StyledLink>
          </Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link href="/resources" passHref legacyBehavior>
            <StyledLink active={pathname === '/resources'} dark={false} aria-current={pathname === '/resources' ? 'page' : undefined}>
              {t('header.resources')}
            </StyledLink>
          </Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link href="/contact" passHref legacyBehavior>
            <StyledLink active={pathname === '/contact'} dark={false} aria-current={pathname === '/contact' ? 'page' : undefined}>
              {t('header.contact')}
            </StyledLink>
          </Link>
        </NavLinkItem>
        <NavLinkItem>
          <Link href="/portal" passHref legacyBehavior>
            <StyledLink active={pathname === '/portal'} dark={false} aria-current={pathname === '/portal' ? 'page' : undefined}>
              {t('header.portal')}
            </StyledLink>
          </Link>
        </NavLinkItem>
      </NavLinks>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {/* Hamburger button toggles the mobile navigation */}
        <HamburgerButton
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ fontSize: '1.5rem', color: '#4b5563' }}
        >
          {/* Simple icons represented by characters; sized up for clarity */}
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </HamburgerButton>
        <Link href="/contact" passHref legacyBehavior>
          <CTAButton aria-label="Contact us">
            {t('contact.title')}
          </CTAButton>
        </Link>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </NavContainer>
  );
}