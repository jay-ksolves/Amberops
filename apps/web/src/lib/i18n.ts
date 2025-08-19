
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(resourcesToBackend((language: string, namespace: string) => {
    // This logic correctly handles trying to load 'en-US' but falling back to 'en' if it doesn't exist.
    // However, the import() itself needs to be dynamic.
    const lang = language.split('-')[0];
    return import(`../../public/locales/${lang}/${namespace}.json`);
  }))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NEXT_PUBLIC_LOGGING_ENABLED === 'true',
    interpolation: {
      escapeValue: false, 
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      // This option ensures that 'en-US' is treated as 'en' for loading files.
      load: 'languageOnly',
    },
  });

export default i18n;
