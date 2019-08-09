import React from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const AboutMe = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography id="about" variant="h4" gutterBottom style={{ marginTop: '1em' }}>
        {t('navigation.about')}
      </Typography>
      <Typography>{t('about.text')}</Typography>
    </div>
  );
};

export default AboutMe;
