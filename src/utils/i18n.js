import en from '../i18n/en.json';
import pl from '../i18n/pl.json';

const translations = { en, pl };

export function useTranslations(lang = 'en') {
  return translations[lang] || translations.en;
}

export function getLanguageFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  return lang === 'pl' ? 'pl' : 'en';
}

export const defaultLang = 'en';
export const languages = {
  en: 'English',
  pl: 'Polski'
};
