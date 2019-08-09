import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import AboutMe from '../components/AboutMe';
import Contact from '../components/Contact';
import Navigation from '../components/Navigation';
import Lectures from '../components/Lectures';
import Footer from '../components/Footer';

const IndexPage = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation();

  return (
    <>
      <div
        style={{
          flexGrow: 1,
        }}
      >
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              style={{
                marginLeft: isLg ? '15em' : '',
                width: isLg ? '45em' : '',
                flexGrow: isLg ? 0 : 1,
              }}
            >
              {t('pageTitle')}
            </Typography>
            <Navigation />
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" style={{ marginTop: '5em' }}>
          <AboutMe />
          <Contact />
          <Lectures />
        </Container>
      </div>
      <Footer />
    </>
  );
};

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default IndexPage;
