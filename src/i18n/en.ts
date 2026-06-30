import type { cs } from './cs';

export const en: typeof cs = {
  meta: {
    title: 'Tomáš Bruckner — software engineer and consultant',
    description:
      'Tomáš Bruckner is a software engineer, web developer and consultant specializing in React, Node.js, MongoDB and AWS. Development, project analysis and tailor-made trainings.',
    ogLocale: 'en_US',
  },
  nav: { about: 'About', lectures: 'Lectures', contact: 'Contact' },
  hero: {
    greeting: "Hi, I'm Tomáš Bruckner.",
    tagline: 'Software engineer & consultant',
    about:
      'Software engineer, web developer and consultant. I specialize in React, Node.js, MongoDB and AWS. I offer programming work, analyzing new and existing projects, implementing and optimizing development processes, and tailor-made trainings.',
    cta: 'Get in touch',
  },
  lectures: { heading: 'Lectures', play: 'Play video' },
  faq: { heading: 'FAQ' },
  contact: { heading: 'Contact', copy: 'Copy e-mail', copied: 'Copied!' },
  footer: { copyright: 'Tomáš Bruckner © 2018–2026' },
  theme: { toggle: 'Toggle light/dark mode' },
  langSwitch: { label: 'Přepnout do češtiny', short: 'CS' },
  notFound: { title: 'Page not found', text: 'This page does not exist.', home: 'Back home' },
} as const;
