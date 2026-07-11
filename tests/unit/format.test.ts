import { describe, it, expect } from 'vitest';
import { formatDate } from '../../src/lib/format';

describe('formatDate', () => {
  const date = new Date(Date.UTC(2020, 3, 6)); // April 6, 2020 (UTC midnight, as unquoted YAML dates parse)

  it('formats a cs-CZ long date', () => {
    expect(formatDate(date, 'cs')).toBe('6. dubna 2020');
  });

  it('formats an en-US long date', () => {
    expect(formatDate(date, 'en')).toBe('April 6, 2020');
  });
});
