import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import styled from '../utils/styled';
import { motion, AnimatePresence } from 'framer-motion';
import type { DefaultTheme } from 'styled-components';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { track } from '../utils/analytics';

// Premium navigation bar with glassmorphism effect
const NavContainer = styled(motion.nav)`
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }: { theme: DefaultTheme }) => `${theme.colors.surface}f2`};
  backdrop-filter: saturate(1.8) blur(20px);
  -webkit-backdrop-filter: saturate(1.8) blur(20px);
  border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  
  &.scrolled {
    padding: 0.75rem 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
  }
  
  @media (max-width: 968px) {
    padding: 0.875rem 1rem;
    position: sticky;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
  }
`;

const NavInner = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

const BrandLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.85;
  }
`;

const SiteName = styled.span`
  font-weight: 700;
  font-size: 1.125rem;
  background: linear-gradient(135deg, #6d28d9 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  
  @media (max-width: 968px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

// Desktop navigation links
const DesktopNav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const NavLink = styled.a<{ active?: boolean }>`
  display: inline-block;
  padding: 0.625rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    background: ${({ theme }: { theme: DefaultTheme }) => `${theme.colors.primary}10`};
  }
  
  ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 1rem;
      right: 1rem;
      height: 2px;
      background: ${theme.colors.primary};
      border-radius: 2px;
    }
  `}
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}, ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary});
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(109, 40, 217, 0.25);
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(109, 40, 217, 0.35);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const IconButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DesktopOnly = styled.div`
  @media (max-width: 968px) {
    display: none;
  }
`;

// Mobile hamburger button with animation
const HamburgerButton = styled.button<{ open?: boolean }>`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  z-index: 1001;
  
  @media (max-width: 968px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HamburgerLine = styled.span<{ open?: boolean }>`
  position: absolute;
  width: 24px;
  height: 2px;
  background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:nth-child(1) {
    top: ${({ open }: { open?: boolean }) => (open ? '50%' : '30%')};
    transform: ${({ open }: { open?: boolean }) => (open ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%)')};
  }
  
  &:nth-child(2) {
    top: 50%;
    transform: translateY(-50%);
    opacity: ${({ open }: { open?: boolean }) => (open ? '0' : '1')};
  }
  
  &:nth-child(3) {
    top: ${({ open }: { open?: boolean }) => (open ? '50%' : '70%')};
    transform: ${({ open }: { open?: boolean }) => (open ? 'translateY(-50%) rotate(-45deg)' : 'translateY(-50%)')};
  }
`;

// Mobile menu overlay
const MobileMenuOverlay = styled(motion.div)`
  display: none;
  
  @media (max-width: 968px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 998;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 968px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 85vw);
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface};
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
    z-index: 999;
    overflow-y: auto;
    overflow-x: hidden;
    
    /* RTL support */
    [dir='rtl'] & {
      right: auto;
      left: 0;
      box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
    }
  }
`;

const MobileMenuHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuTitle = styled.div`
  font-weight: 700;
  font-size: 1.125rem;
  background: linear-gradient(135deg, #6d28d9 0%, #0ea5e9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const MobileCloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
  }
`;

const MobileNavLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 0;
`;

const MobileNavItem = styled.li`
  margin: 0;
`;

const MobileNavLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  transition: all 0.2s ease;
  background: ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active ? `${theme.colors.primary}10` : 'transparent'};
  border-left: 3px solid ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
    active ? theme.colors.primary : 'transparent'};
  
  &:hover {
    background: ${({ theme }: { theme: DefaultTheme }) => `${theme.colors.primary}08`};
    color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
  }
  
  &:active {
    background: ${({ theme }: { theme: DefaultTheme }) => `${theme.colors.primary}15`};
  }
  
  [dir='rtl'] & {
    border-left: none;
    border-right: 3px solid ${({ active, theme }: { active?: boolean; theme: DefaultTheme }) =>
      active ? theme.colors.primary : 'transparent'};
  }
`;

const MobileNavIcon = styled.span`
  font-size: 1.25rem;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileCTA = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 1.5rem;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary}, ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary});
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(109, 40, 217, 0.3);
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
`;

const MobileFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileFooterTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.mutedText};
  letter-spacing: 0.05em;
`;

const MobileSettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
`;

const MobileSettingsLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pathname } = router;
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu open
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navigationItems = [
    { href: '/', label: t('header.home'), icon: '🏠' },
    { href: '/about', label: t('header.about'), icon: '👤' },
    { href: '/services', label: t('header.services'), icon: '⚙️' },
    { href: '/pricing', label: t('footer.pricing', { defaultValue: 'Pricing' }), icon: '💰' },
    { href: '/case-studies', label: t('footer.case_studies', { defaultValue: 'Case Studies' }), icon: '📈' },
    { href: '/resources', label: t('header.resources'), icon: '📚' },
    { href: '/portal', label: t('header.portal'), icon: '🔐' }
  ];

  return (
    <>
      <NavContainer
        role="navigation"
        aria-label="Main navigation"
        className={scrolled ? 'scrolled' : ''}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <NavInner>
          <Brand>
            <Link href="/" passHref legacyBehavior>
              <BrandLink aria-label={`${t('seo.siteName', { defaultValue: 'ProBook Solutions' })} home`}>
                <Logo size={28} />
                <SiteName>{t('seo.siteName', { defaultValue: 'ProBook Solutions' })}</SiteName>
              </BrandLink>
            </Link>
          </Brand>

          {/* Desktop Navigation */}
          <DesktopNav>
            {navigationItems.slice(0, 6).map((item) => (
              <li key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <NavLink
                    active={pathname === item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </NavLink>
                </Link>
              </li>
            ))}
          </DesktopNav>

          <RightActions>
            {/* Hamburger for mobile */}
            <HamburgerButton
              open={menuOpen}
              type="button"
              aria-label={menuOpen ? t('common.close', { defaultValue: 'Close menu' }) : t('common.open_menu', { defaultValue: 'Open menu' })}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HamburgerLine open={menuOpen} />
              <HamburgerLine open={menuOpen} />
              <HamburgerLine open={menuOpen} />
            </HamburgerButton>

            {/* Desktop CTA */}
            <Link href="/consultation" passHref legacyBehavior>
              <CTAButton
                onClick={() => track({ name: 'cta_click', label: 'navbar_consultation', href: '/consultation' })}
                aria-label={t('cta.book_consultation')}
              >
                <span>📅</span>
                {t('cta.book_consultation')}
              </CTAButton>
            </Link>

            <IconButtonGroup>
              <ThemeToggle />
              <DesktopOnly>
                <LanguageSwitcher />
              </DesktopOnly>
            </IconButtonGroup>
          </RightActions>
        </NavInner>
      </NavContainer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />
            <MobileMenu
              id="mobile-navigation"
              role="dialog"
              aria-label="Mobile navigation menu"
              initial={{ x: i18n.dir() === 'rtl' ? -320 : 320 }}
              animate={{ x: 0 }}
              exit={{ x: i18n.dir() === 'rtl' ? -320 : 320 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <MobileMenuHeader>
                <MobileMenuTitle>{t('seo.siteName', { defaultValue: 'ProBook Solutions' })}</MobileMenuTitle>
                <MobileCloseButton
                  onClick={() => setMenuOpen(false)}
                  aria-label={t('common.close', { defaultValue: 'Close menu' })}
                >
                  ×
                </MobileCloseButton>
              </MobileMenuHeader>

              <MobileNavLinks>
                {navigationItems.map((item) => (
                  <MobileNavItem key={item.href}>
                    <Link href={item.href} passHref legacyBehavior>
                      <MobileNavLink
                        active={pathname === item.href}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        <MobileNavIcon>{item.icon}</MobileNavIcon>
                        {item.label}
                      </MobileNavLink>
                    </Link>
                  </MobileNavItem>
                ))}
              </MobileNavLinks>

              <MobileCTA
                href="/consultation"
                onClick={() => {
                  track({ name: 'cta_click', label: 'mobile_nav_consultation', href: '/consultation' });
                  setMenuOpen(false);
                }}
              >
                <span>📅</span>
                {t('cta.book_consultation')}
              </MobileCTA>

              <MobileFooter>
                <MobileFooterTitle>{t('common.settings', { defaultValue: 'Settings' })}</MobileFooterTitle>
                <MobileSettingsRow>
                  <MobileSettingsLabel>{t('common.theme', { defaultValue: 'Theme' })}</MobileSettingsLabel>
                  <ThemeToggle />
                </MobileSettingsRow>
                <MobileSettingsRow>
                  <MobileSettingsLabel>{t('header.language')}</MobileSettingsLabel>
                  <LanguageSwitcher />
                </MobileSettingsRow>
              </MobileFooter>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
