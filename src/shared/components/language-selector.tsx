'use client'

import { useRouter, usePathname } from 'next/navigation';

const locales = ['en', 'es'];

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    const [, , ...rest] = pathname.split('/');
    router.push(`/${newLocale}/${rest.join('/')}`);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} value={pathname.split('/')[1]}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}