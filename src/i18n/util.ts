import { cs } from './cs';
import { en } from './en';

export type Lang = 'cs' | 'en';

const dictionaries = { cs, en } as const;

export function useTranslations(lang: Lang): typeof cs {
  return dictionaries[lang];
}

export function getAltLangUrl(lang: Lang): string {
  return lang === 'cs' ? '/en/' : '/';
}

export function altLang(lang: Lang): Lang {
  return lang === 'cs' ? 'en' : 'cs';
}
