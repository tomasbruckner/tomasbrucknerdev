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
  videos: {
    unfurling: 'Unfurling — how to improve your website preview (czech audio)',
    neuron: 'Introduction to Neural Networks',
    microservices: 'Introduction to Microservices',
    microfrontend: 'Introduction to Microfrontend pattern',
    garbagecollector: 'Garbage Collectors',
    babel: 'Babel — writing our first plugin (czech audio)',
    aws: 'AWS — the most interesting parts (czech audio)',
    alexa: 'Alexa — first application (czech audio)',
    mongo1: 'MongoDB — Part 1 (czech audio)',
    mongo2: 'MongoDB — Part 2 (czech audio)',
    docker: 'Docker — performance problems on Windows and OSX (czech audio)',
    adonis: 'Adonis — case study (czech audio)',
  },
  faqItems: {
    help: {
      q: 'What do I help with?',
      a: 'Building web apps in React and Node.js, designing and optimizing MongoDB, deploying on AWS, analyzing new and existing projects, setting up development processes, and tailor-made team trainings.',
    },
    clients: {
      q: 'Who do I work for?',
      a: 'I work with startups and established companies that need a senior developer or consultant on their team, or an independent view on architecture and processes.',
    },
    cooperation: {
      q: 'How does cooperation work?',
      a: 'We start with a no-commitment consultation to clarify goals and scope. I work tailor-made — from a one-off analysis through implementation to long-term cooperation and training.',
    },
  },
};
