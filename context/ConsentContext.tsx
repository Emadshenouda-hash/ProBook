import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type ConsentContextValue = {
  consent: ConsentCategories;
  setConsent: (next: ConsentCategories) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  isDecided: boolean;
};

const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false
};

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<ConsentCategories>(DEFAULT_CONSENT);
  const [isDecided, setIsDecided] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('pb_consent_v1');
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentCategories;
        setConsentState({ necessary: true, analytics: !!parsed.analytics, marketing: !!parsed.marketing });
        setIsDecided(true);
      }
    } catch {}
  }, []);

  const persist = (next: ConsentCategories) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('pb_consent_v1', JSON.stringify(next));
        // Expose a minimal global for libraries/utilities to check
        (window as any).__consent = next;
      } catch {}
    }
  };

  const setConsent = (next: ConsentCategories) => {
    setConsentState(next);
    setIsDecided(true);
    persist(next);
  };

  const acceptAll = () => setConsent({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => setConsent({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    // keep window in sync on initial render
    if (typeof window !== 'undefined') {
      (window as any).__consent = consent;
    }
  }, [consent]);

  const value = useMemo<ConsentContextValue>(() => ({ consent, setConsent, acceptAll, rejectAll, isDecided }), [consent, isDecided]);

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}

export type { ConsentCategories, ConsentContextValue };

