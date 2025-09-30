import type { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { useRouter } from 'next/router';
import { ThemeProvider } from '../utils/styled';
import i18n from '../i18n';
import Layout from '../components/Layout';
import Analytics from '../components/Analytics';
import { lightTheme, darkTheme } from '../theme';
import ThemeToggleContext from '../context/ThemeToggleContext';
import React, { useState, useEffect } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;
  // Immediately synchronize i18n language with the Next.js locale.  This
  // executes both on the server and the client, ensuring that the server
  // renders with the correct language and preventing hydration mismatches.
  if (locale && i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  // Manage theme mode: 'light' or 'dark'. Always start with light on the server and hydrate, then update on client.
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // On mount, check stored preference or system preference and update.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('themeMode') as 'light' | 'dark' | null;
      let preferred: 'light' | 'dark' = 'light';
      if (stored === 'light' || stored === 'dark') {
        preferred = stored;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        preferred = 'dark';
      }
      setMode(preferred);
    }
  }, []);

  // Persist mode changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode]);

  // Capture UTM params and store for forms
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const utms = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'] as const;
      utms.forEach((key) => {
        const val = url.searchParams.get(key);
        if (val) sessionStorage.setItem(key, val);
      });
    }
  }, []);

  const toggleTheme = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  const activeTheme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={activeTheme}>
          {/* Include analytics scripts if configured */}
          <Analytics />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <VercelAnalytics />
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </I18nextProvider>
  );
}