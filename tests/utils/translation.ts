import path from 'path';
import fs from 'fs';
import { Language, NestedTranslations } from './types';

export function loadTranslations(lang: Language): NestedTranslations {
  const filePath = path.join(process.cwd(), 'src', 'i18n', 'locales', `${lang}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export function getNestedTranslation(obj: NestedTranslations, path: string): string {
  const keys = path.split('.');
  return keys.reduce((acc: any, key) => acc && acc[key], obj) as string;
}