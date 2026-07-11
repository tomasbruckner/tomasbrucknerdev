import type { cs } from './cs';

export const en: typeof cs = {
  meta: {
    title: 'Tomáš Bruckner — software engineer and consultant',
    description:
      'Tomáš Bruckner is a software engineer, web developer and consultant. Development, project analysis and tailor-made trainings.',
    ogLocale: 'en_US',
  },
  nav: { about: 'About', lectures: 'Lectures', blog: 'Blog', contact: 'Contact', menu: 'Menu' },
  hero: {
    greeting: "Hi, I'm Tomáš Bruckner.",
    tagline: 'Software engineer & consultant',
    about:
      'Software engineer, web developer and consultant. I offer programming work, analyzing new and existing projects, implementing and optimizing development processes, and tailor-made trainings.',
    cta: 'Get in touch',
  },
  lectures: { heading: 'Lectures', play: 'Play video' },
  blog: {
    heading: 'Blog',
    metaTitle: 'Blog — Tomáš Bruckner',
    metaDescription: 'Articles about software development — .NET, PHP, Docker and more.',
    readingTime: 'min read',
    allPosts: 'All posts',
    tagHeading: 'Tag',
    backToBlog: 'Back to blog',
    published: 'Published',
    empty: 'No posts yet.',
  },
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
};
