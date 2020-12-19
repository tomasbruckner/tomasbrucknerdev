import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { t } from '../utils/i18n';

const AboutMe: FC = () => {
  return (
    <div>
      <Typography id="about" variant="h4" gutterBottom>
        {t('navigation.about')}
      </Typography>
      <Typography>{t('about.text')}</Typography>
    </div>
  );
};

export default AboutMe;
