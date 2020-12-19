import React, { FC } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MediumIcon from './icons/MediumIcon';
import GithubIcon from './icons/GithubIcon';
import StackOverflowIcon from './icons/StackOverflowIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import ContactEmailIcon from './icons/ContactEmailIcon';
import { useCommonStyles } from '../styles/commonStyles';
import { t } from '../utils/i18n';

const useStyles = makeStyles((theme) => ({
  contact: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    marginTop: theme.spacing(2),
  },
}));

const Contact: FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <>
      <Typography variant="h4" id="contact" gutterBottom className={classes.text}>
        {t('navigation.contact')}
      </Typography>
      <Typography gutterBottom className={classes.contact}>
        <GithubIcon />
        <a className={commonClasses.linkStyle} href="https://github.com/tomasbruckner">
          github.com/tomasbruckner
        </a>
      </Typography>
      <Typography gutterBottom className={classes.contact}>
        <StackOverflowIcon />
        <a
          className={commonClasses.linkStyle}
          href="https://stackoverflow.com/users/3323141/tomas-bruckner"
        >
          stackoverflow.com/users/3323141
        </a>
      </Typography>
      <Typography gutterBottom className={classes.contact}>
        <MediumIcon />
        <a className={commonClasses.linkStyle} href="https://medium.com/@tomasbruckner">
          medium.com/@tomasbruckner
        </a>
      </Typography>
      <Typography gutterBottom className={classes.contact}>
        <LinkedinIcon />
        <a className={commonClasses.linkStyle} href="https://www.linkedin.com/in/tomasbruckner">
          linkedin.com/in/tomasbruckner
        </a>
      </Typography>
      <Typography gutterBottom className={classes.contact}>
        <ContactEmailIcon />
        <a className={commonClasses.linkStyle} href="mailto:tomasbrucknermail@gmail.com">
          tomasbrucknermail@gmail.com
        </a>
      </Typography>
    </>
  );
};

export default Contact;
