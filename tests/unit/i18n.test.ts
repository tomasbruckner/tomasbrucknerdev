import { describe, it, expect } from 'vitest';
import { useTranslations, getAltLangUrl, altLang } from '../../src/i18n/util';
import { cs } from '../../src/i18n/cs';
import { en } from '../../src/i18n/en';

describe('i18n', () => {
  it('returns the right dictionary per locale', () => {
    expect(useTranslations('cs').nav.about).toBe('O mně');
    expect(useTranslations('en').nav.about).toBe('About');
  });

  it('maps to the alternate language url', () => {
    expect(getAltLangUrl('cs')).toBe('/en/');
    expect(getAltLangUrl('en')).toBe('/');
  });

  it('maps cs pathnames to their en equivalent', () => {
    expect(getAltLangUrl('cs', '/')).toBe('/en/');
    expect(getAltLangUrl('cs', '/blog/')).toBe('/en/blog/');
    expect(getAltLangUrl('cs', '/blog/some-slug/')).toBe('/en/blog/some-slug/');
  });

  it('maps en pathnames to their cs equivalent', () => {
    expect(getAltLangUrl('en', '/en/')).toBe('/');
    expect(getAltLangUrl('en', '/en/blog/')).toBe('/blog/');
    expect(getAltLangUrl('en', '/en/blog/some-slug/')).toBe('/blog/some-slug/');
    expect(getAltLangUrl('en', '/en')).toBe('/');
  });

  it('handles pathnames without a trailing slash', () => {
    expect(getAltLangUrl('cs', '/blog')).toBe('/en/blog');
    expect(getAltLangUrl('en', '/en/blog')).toBe('/blog');
  });

  it('maps to the alternate language code', () => {
    expect(altLang('cs')).toBe('en');
    expect(altLang('en')).toBe('cs');
  });

  it('cs and en have identical key shape', () => {
    const keys = (o: object): string[] =>
      Object.entries(o)
        .flatMap(([k, v]) =>
          v && typeof v === 'object' ? Object.keys(v).map((c) => `${k}.${c}`) : [k],
        )
        .sort();
    expect(keys(cs)).toEqual(keys(en));
  });
});
