export const locales = ['en', 'es'];

export function isValidLocale(locale: string): locale is 'en' | 'es' {
  return locales.includes(locale);
}

export function getLocaleFromHeaders(acceptLanguage: string | null): string {
  return acceptLanguage?.split(',')[0].split('-')[0] || 'en';
}