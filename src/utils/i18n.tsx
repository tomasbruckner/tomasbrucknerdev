import get from 'lodash/get';

type Languages = 'en' | 'cs';
type Namespaces = 'translation';

const translations = {
  en: {
    translation: {
      footer: {
        copyright: 'Tomáš Bruckner © 2018 - 2019',
      },
      pageTitle: ' Tomáš Bruckner',
      navigation: {
        about: 'About me',
        contact: 'Contact',
        lectures: 'Lectures',
      },
      about: {
        text:
          'Software engineer, web developer and consultant. I specialize in React, Node.js, MongoDB and AWS. I offer programming work, analyzing new and existing projects, implementing and optimizing development processes, and tailor-made trainings.',
      },
      videos: {
        unfurling: 'Unfurling - How to improve your website preview (czech audio)',
        neuron: 'Introduction to Neural Networks',
        microservices: 'Introduction to Microservices',
        microfrontend: 'Introduction to Microfrontend pattern',
        babel: 'Babel - Writing our first plugin (czech audio)',
        aws: 'AWS - The most interesting parts (czech audio)',
        alexa: 'Alexa - First application (czech audio)',
        mongo1: 'MongoDB - Part 1 (czech audio)',
        mongo2: 'MongoDB - Part 2 (czech audio)',
        docker: 'Docker - Performance problems on Windows and OSX (czech audio)',
        adonis: 'Adonis - Case study (czech audio)',
      },
    },
  },
  cs: {
    translation: {
      footer: {
        copyright: 'Tomáš Bruckner © 2018 - 2019',
      },
      pageTitle: ' Tomáš Bruckner',
      navigation: {
        about: 'O mně',
        contact: 'Kontakt',
        lectures: 'Lekce',
      },
      about: {
        text:
          'Softwarový inženýr, webový vývojář a konzultant. Specializuji se na React, Node.js, MongoDB a AWS. Nabízím programátorské práce, analyzování nových i existujících projektů, zavádění a optimalizace vývojových procesů i školení na míru.',
      },
      videos: {
        unfurling: 'Unfurling - Jak definovat preview webové stránky',
        neuron: 'Neuronové sítě',
        microservices: 'Microservisy',
        microfrontend: 'Microfrontendy',
        babel: 'Babel - Jak si udělat vlastní plugin',
        aws: 'AWS - To nejzajímavější',
        alexa: 'Alexa - Jak si udělat vlastní aplikaci',
        mongo1: 'MongoDB - Část 1',
        mongo2: 'MongoDB - Část 2',
        docker: 'Docker - Performance problém na Windows a OSX a jak ho řešit',
        adonis: 'AdonisJS - Případová studie',
      },
    },
  },
} as const;

let language: Languages = 'cs';
let namespace: Namespaces = 'translation';

export const t = (key: string): string => {
  return get(translations, [language, namespace, ...key.split('.')], key);
};

export const changeLanguage = (lang: Languages): void => {
  language = lang;
};

export const changeNamespace = (ns: Namespaces): void => {
  namespace = ns;
};
