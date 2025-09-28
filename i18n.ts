import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';

// Initialize i18next with translations for English and Arabic.
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en as any },
      ar: { translation: ar as any }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;