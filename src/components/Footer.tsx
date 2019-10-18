import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { t } from '../utils/i18n';

const Footer = () => {
  const theme = useTheme();

  return (
    <footer>
      <div
        style={{
          width: '100%',
          minHeight: '64px',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Typography>{t('footer.copyright')}</Typography>
      </div>
    </footer>
  );
};

export default Footer;
