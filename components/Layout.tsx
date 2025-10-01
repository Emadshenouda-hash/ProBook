import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import styled, { createGlobalStyle, useTheme } from '../utils/styled';
import type { DefaultTheme } from 'styled-components';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';
import dynamic from 'next/dynamic';

// Dynamically import the chat widget only on the client to prevent
// mismatches during server-side rendering. This avoids loading any
// browser‑specific APIs until after hydration.
const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
}

// Global styles set the direction based on the active locale.
const GlobalStyle = createGlobalStyle<{ dir: string; fontFamily: string }>`
  :root {
    --color-primary: ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    --color-secondary: ${({ theme }: { theme: DefaultTheme }) => theme.colors.secondary};
    --color-bg: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
    --color-surface: ${({ theme }: { theme: DefaultTheme }) => theme.colors.surface || theme.colors.background};
    --color-text: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
    --color-border: ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  html { 
    overflow-x: hidden;
    width: 100%;
    font-feature-settings: "kern" 1, "liga" 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ fontFamily }: { fontFamily: string }) => fontFamily};
    direction: ${({ dir }: { dir: string }) => dir};
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: ${({ theme }: { theme: DefaultTheme }) => theme.typography.lineHeightBase};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    overscroll-behavior-x: contain;
    width: 100%;
    position: relative;
  }

  /* Prevent any child from forcing horizontal scrolling */
  * {
    max-width: 100%;
    box-sizing: border-box;
  }
  
  #__next, header, nav, footer, section, main, div, article, aside {
    max-width: 100vw;
    overflow-x: hidden;
  }

  /* Prevent media from exceeding viewport width */
  img, svg, video, canvas {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Avoid long words pushing layout horizontally in content text only */
  p, li {
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  :focus-visible {
    outline: 3px solid ${({ theme }: { theme: DefaultTheme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Logical spacing for RTL/LTR; avoid fixed left/right padding offsets */
  [dir='rtl'] * {
    text-align: start;
  }

  h1 { font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.scale.h1}; margin: 0 0 0.5rem; font-family: var(--font-merri, ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontFamilySerifHeading}); }
  h2 { font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.scale.h2}; margin: 0 0 0.5rem; font-family: var(--font-merri, ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontFamilySerifHeading}); }
  h3 { font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.scale.h3}; margin: 0 0 0.5rem; font-family: var(--font-merri, ${({ theme }: { theme: DefaultTheme }) => theme.typography.fontFamilySerifHeading}); }
  h4 { font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.scale.h4}; margin: 0 0 0.5rem; }
  p { font-size: ${({ theme }: { theme: DefaultTheme }) => theme.typography.scale.body}; }
`;

const SkipLink = styled('a')`
  position: absolute;
  left: -999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: -1;
  &:focus {
    left: 1rem;
    top: 1rem;
    width: auto;
    height: auto;
    padding: 0.5rem 1rem;
    background: #000;
    color: #fff;
    border-radius: 4px;
    z-index: 1000;
  }
`;

const Container = styled('div')`
  max-width: ${({ theme }: { theme: DefaultTheme }) => theme.layout.containerMaxWidth};
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    top: -24px; inset-inline-start: 0; inset-inline-end: 0; height: 12px;
    background: linear-gradient(90deg, rgba(12,94,215,0.08), rgba(124,58,237,0.08));
    border-radius: 999px;
    filter: blur(12px);
    pointer-events: none;
    max-width: 100%;
  }
`;

const Main = styled('main')`
  padding: 1rem 0;
  min-height: 80vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { locale } = router;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const theme = useTheme();
  const fontFamily = dir === 'rtl' ? theme.typography.fontFamilySansArabic : theme.typography.fontFamilySansLatin;

  // Ensure that i18n uses the locale from the router
  useEffect(() => {
    // set HTML dir attribute for accessibility
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale || 'en';
      document.documentElement.dir = dir;
    }
  }, [locale, dir]);

  return (
    <>
      <GlobalStyle dir={dir} fontFamily={fontFamily} />
      <SkipLink href="#main">Skip to content</SkipLink>
      <Navbar />
      <Container>
        {/* Render breadcrumbs to help users understand where they are in the site hierarchy */}
        <Breadcrumbs />
        <Main id="main" tabIndex={-1}>
          {children}
        </Main>
      </Container>
      <Footer />
      {/* Render the floating chat widget on every page. It will only
          initialise on the client and will not interfere with server
          rendering. */}
      <ChatWidget />
    </>
  );
}