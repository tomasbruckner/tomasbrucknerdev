import type { cs } from '../i18n/cs';

export type FaqKey = keyof typeof cs['faqItems'];

export const FAQ_ITEMS: readonly FaqKey[] = ['help', 'clients', 'cooperation'] as const;
