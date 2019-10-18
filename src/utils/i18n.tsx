import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'cs',
  lng: 'cs',
  debug: false,
  load: 'languageOnly',
  ns: ['translation'],
  resources: {
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
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  react: {
    wait: true,
    useSuspense: false,
  },
});

export default i18n;
