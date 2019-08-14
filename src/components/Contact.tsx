import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import MediumIcon from './icons/MediumIcon';
import GithubIcon from './icons/GithubIcon';
import StackOverflowIcon from './icons/StackOverflowIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import ContactEmailIcon from './icons/ContactEmailIcon';
import { linkStyle } from '../styles/commonStyles';

const contactStyle = { marginTop: '1em', display: 'flex', alignItems: 'center' };

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h4" id="contact" gutterBottom style={{ marginTop: '1em' }}>
        {t('navigation.contact')}
      </Typography>
      <Typography gutterBottom style={contactStyle}>
        <GithubIcon />
        <a style={linkStyle} href="https://github.com/tomasbruckner">
          github.com/tomasbruckner
        </a>
      </Typography>
      <Typography gutterBottom style={contactStyle}>
        <StackOverflowIcon />
        <a style={linkStyle} href="https://stackoverflow.com/users/3323141/tomas-bruckner">
          stackoverflow.com/users/3323141
        </a>
      </Typography>
      <Typography gutterBottom style={contactStyle}>
        <MediumIcon />
        <a style={linkStyle} href="https://medium.com/@tomasbruckner">
          medium.com/@tomasbruckner
        </a>
      </Typography>
      <Typography gutterBottom style={contactStyle}>
        <LinkedinIcon />
        <a style={linkStyle} href="https://www.linkedin.com/in/tomasbruckner">
          linkedin.com/in/tomasbruckner
        </a>
      </Typography>
      <Typography gutterBottom style={contactStyle}>
        <ContactEmailIcon />
        <a style={linkStyle} href="mailto:tomasbrucknermail@gmail.com">
          tomasbrucknermail@gmail.com
        </a>
      </Typography>
    </>
  );
};

export default Contact;
