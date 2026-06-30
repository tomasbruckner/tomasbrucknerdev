import { describe, it, expect } from 'vitest';
import { LECTURES } from '../../src/data/lectures';
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
