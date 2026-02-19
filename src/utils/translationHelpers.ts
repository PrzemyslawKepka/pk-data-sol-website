/**
 * Centralized translation helpers for projects and blog posts.
 * Consolidates duplicated mapping dictionaries and label functions.
 */

// =============================================================================
// PROJECT CONSTANTS
// =============================================================================

/** Project type badge colors - solid backgrounds with backdrop blur */
export const projectTypeColors: Record<string, string> = {
  fte: 'bg-blue-600/90 text-white border-blue-400/50 backdrop-blur-sm shadow-lg',
  current: 'bg-green-600/90 text-white border-green-400/50 backdrop-blur-sm shadow-lg',
  side: 'bg-purple-600/90 text-white border-purple-400/50 backdrop-blur-sm shadow-lg'
};

/** Project type colors for slug pages (lighter variant) */
export const projectTypeColorsLight: Record<string, string> = {
  fte: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  current: 'bg-green-500/20 text-green-400 border-green-500/30',
  side: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

/** Default English labels for project types (fallback) */
export const defaultProjectTypeLabels: Record<string, string> = {
  fte: 'Corporate',
  current: 'Current',
  side: 'Side Project'
};

/** Category key mapping (data value → translation key) */
export const categoryKeyMap: Record<string, string> = {
  'Web Application': 'webApplication',
  'Automation': 'automation',
  'Developer Tools': 'developerTools',
  'Dashboard': 'dashboard',
  'ETL Pipeline': 'etl',
  'Data Analysis': 'dataAnalysis',
  'Web Scraping': 'webScraping'
};

/** Industry key mapping (data value → translation key) */
export const industryKeyMap: Record<string, string> = {
  'Finance': 'finance',
  'Credit Risk': 'creditRisk',
  'Real Estate': 'realEstate',
  'IoT': 'iot',
  'Accounting': 'accounting',
  'Social Media': 'socialMedia',
  'Gaming': 'gaming'
};

// =============================================================================
// BLOG CONSTANTS
// =============================================================================

/** Blog category badge colors - solid backgrounds with backdrop blur */
export const blogCategoryColors: Record<string, string> = {
  Technical: 'bg-blue-600/90 text-white border-blue-400/50 backdrop-blur-sm shadow-lg',
  Business: 'bg-green-600/90 text-white border-green-400/50 backdrop-blur-sm shadow-lg'
};

/** Blog category colors for slug pages (lighter variant) */
export const blogCategoryColorsLight: Record<string, string> = {
  Technical: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Business: 'bg-green-500/20 text-green-400 border-green-500/30'
};

// =============================================================================
// LABEL FUNCTIONS
// =============================================================================

interface TranslationsWithBadgeLabels {
  badgeLabels?: Record<string, string>;
}

interface TranslationsWithCategories {
  categories?: Record<string, string>;
}

interface TranslationsWithIndustries {
  industries?: Record<string, string>;
}

interface TranslationsWithCommercial {
  commercial?: string;
  nonCommercial?: string;
}

/**
 * Get translated project type label with fallback
 */
export function getProjectTypeLabel(
  type: string,
  translations: TranslationsWithBadgeLabels
): string {
  return translations.badgeLabels?.[type] || defaultProjectTypeLabels[type] || type;
}

/**
 * Get translated category label with fallback
 */
export function getCategoryLabel(
  category: string,
  translations: TranslationsWithCategories
): string {
  const key = categoryKeyMap[category];
  return key && translations.categories?.[key] ? translations.categories[key] : category;
}

/**
 * Get translated industry label with fallback
 */
export function getIndustryLabel(
  industry: string,
  translations: TranslationsWithIndustries
): string {
  const key = industryKeyMap[industry];
  return key && translations.industries?.[key] ? translations.industries[key] : industry;
}

/**
 * Get translated commercial status label
 */
export function getCommercialLabel(
  isCommercial: boolean,
  translations: TranslationsWithCommercial
): string {
  return isCommercial
    ? (translations.commercial || 'Commercial')
    : (translations.nonCommercial || 'Non-commercial');
}

// =============================================================================
// LOCALIZED CONTENT HELPERS
// =============================================================================

interface LocalizableContent {
  description: string;
  descriptionPl?: string;
}

/**
 * Get localized description based on language, with fallback to English
 */
export function getLocalizedDescription<T extends LocalizableContent>(
  data: T,
  lang: string
): string {
  if (lang === 'pl' && data.descriptionPl) {
    return data.descriptionPl;
  }
  return data.description;
}

/**
 * Get base path for language-aware routing
 */
export function getBasePath(lang: string): string {
  return lang === 'pl' ? '/pl' : '';
}

/**
 * Format date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}
