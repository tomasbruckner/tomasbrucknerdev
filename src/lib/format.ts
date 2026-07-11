import type { Lang } from '../i18n/util';

const locales: Record<Lang, string> = { cs: 'cs-CZ', en: 'en-US' };

/** BCP-47 locale tag for a site language. */
export function localeCode(lang: Lang): string {
  return locales[lang];
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}
