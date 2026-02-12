// Simple language store for cross-component communication
// Uses localStorage for persistence and custom events for reactivity

export type Language = 'en' | 'pl';

const STORAGE_KEY = 'pk-lang';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  return (localStorage.getItem(STORAGE_KEY) as Language) || 'en';
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, lang);
}

export function getLanguageFromPath(): Language {
  if (typeof window === 'undefined') return 'en';
  return window.location.pathname.startsWith('/pl') ? 'pl' : 'en';
}

export function getLocalizedPath(targetLang: Language, currentPath: string): string {
  // Remove any existing /pl prefix
  const cleanPath = currentPath.replace(/^\/pl/, '') || '/';

  if (targetLang === 'pl') {
    return `/pl${cleanPath === '/' ? '' : cleanPath}`;
  }
  return cleanPath;
}
