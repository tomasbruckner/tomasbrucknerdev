import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
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
