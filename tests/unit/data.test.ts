import { describe, it, expect } from 'vitest';
import { LECTURES } from '../../src/data/lectures';
import { FAQ_ITEMS } from '../../src/data/faq';
import { cs } from '../../src/i18n/cs';
import { en } from '../../src/i18n/en';

describe('lectures data', () => {
  it('has 12 lectures with valid 11-char youtube ids', () => {
    expect(LECTURES).toHaveLength(12);
    for (const l of LECTURES) expect(l.youtubeId).toMatch(/^[\w-]{11}$/);
  });

  it('every lecture key has a title in both languages', () => {
    for (const l of LECTURES) {
      expect(cs.videos[l.key]).toBeTruthy();
      expect(en.videos[l.key]).toBeTruthy();
    }
  });
});

describe('faq data', () => {
  it('every faq key has q and a in both languages', () => {
    for (const k of FAQ_ITEMS) {
      expect(cs.faqItems[k].q).toBeTruthy();
      expect(cs.faqItems[k].a).toBeTruthy();
      expect(en.faqItems[k].q).toBeTruthy();
      expect(en.faqItems[k].a).toBeTruthy();
    }
  });
});
