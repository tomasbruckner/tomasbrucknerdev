import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Navigation from './components/Navigation';
import Container from '@material-ui/core/Container';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Lectures from './components/Lectures';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';
import { menuLinkStyle } from './styles/commonStyles';

const App = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation();

  return (
    <div>
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
              <a href="#home" style={menuLinkStyle}>
                {t('pageTitle')}
              </a>
            </Typography>
            <Navigation />
          </Toolbar>
        </AppBar>
        <Container id="home" maxWidth="md" style={{ marginTop: '5em' }}>
          <AboutMe />
          <Contact />
          <Lectures />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default App;
