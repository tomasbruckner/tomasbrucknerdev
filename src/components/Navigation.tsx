import React from 'react';
import { useTranslation } from 'react-i18next';

const linkStyle = {
  textDecoration: 'none',
  padding: 16,
  color: 'white',
  fontWeight: 500,
  fontSize: 20,
};

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <>
      <a style={linkStyle} href="#about">
        {t('navigation.about')}
      </a>
      <a style={linkStyle} href="#contact">
        {t('navigation.contact')}
      </a>
      <a style={linkStyle} href="#lectures">
        {t('navigation.lectures')}
      </a>
    </>
  );
};

export default Navigation;
