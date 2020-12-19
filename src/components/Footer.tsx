import React, { FC } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { t } from '../utils/i18n';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    minHeight: '64px',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
  },
}));

const Footer: FC = () => {
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.container}>
        <Typography>{t('footer.copyright')}</Typography>
      </div>
    </footer>
  );
};

export default Footer;
