/**
 * Language helper utilities for i18n routing
 */

export type Lang = 'en' | 'pl';

/**
 * Extracts language from Astro.params.lang
 * Returns 'en' for undefined (root routes), 'pl' for '/pl/' routes
 */
export function getLangFromParams(langParam: string | undefined): Lang {
  return langParam === 'pl' ? 'pl' : 'en';
}

/**
 * Returns the base path for a given language
 * '' for English (root), '/pl' for Polish
 */
export function getBasePath(lang: Lang): string {
  return lang === 'pl' ? '/pl' : '';
}

/**
 * Returns static paths for language routing
 * Used in getStaticPaths for [...lang] routes
 */
export function getLanguagePaths() {
  return [
    { params: { lang: undefined } },  // English: /
    { params: { lang: 'pl' } }        // Polish: /pl/
  ];
}

/**
 * Industries data with translations
 */
export function getIndustries(lang: Lang) {
  const industries = [
    { key: 'Finance', nameEn: 'Finance', namePl: 'Finanse', emoji: '💰' },
    { key: 'Accounting', nameEn: 'Accounting', namePl: 'Księgowość', emoji: '📊' },
    { key: 'Credit Risk', nameEn: 'Credit Risk', namePl: 'Ryzyko Kredytowe', emoji: '📉' },
    { key: 'IoT', nameEn: 'Internet of Things (IoT)', namePl: 'Internet Rzeczy (IoT)', emoji: '🔌' },
    { key: 'Real Estate', nameEn: 'Real Estate', namePl: 'Nieruchomości', emoji: '🏢' },
    { key: 'Social Media', nameEn: 'Social Media', namePl: 'Media Społecznościowe', emoji: '📱' }
  ];

  return industries.map(industry => ({
    key: industry.key,
    name: lang === 'pl' ? industry.namePl : industry.nameEn,
    emoji: industry.emoji
  }));
}

/**
 * Project type labels with translations
 */
export function getProjectTypeLabels(lang: Lang): Record<string, string> {
  if (lang === 'pl') {
    return {
      fte: 'Projekt Korporacyjny',
      current: 'Bieżący Projekt',
      side: 'Projekt Poboczny'
    };
  }
  return {
    fte: 'Corporate Project',
    current: 'Current Project',
    side: 'Side Project'
  };
}

/**
 * Commercial status labels with translations
 */
export function getCommercialLabels(lang: Lang): { commercial: string; nonCommercial: string } {
  if (lang === 'pl') {
    return {
      commercial: 'Komercyjny',
      nonCommercial: 'Niekomercyjny'
    };
  }
  return {
    commercial: 'Commercial',
    nonCommercial: 'Non-commercial'
  };
}
