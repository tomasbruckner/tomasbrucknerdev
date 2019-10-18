import React from 'react';
import { AppBar, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Navigation from '../src/components/Navigation';
import Container from '@material-ui/core/Container';
import AboutMe from '../src/components/AboutMe';
import Contact from '../src/components/Contact';
import Lectures from '../src/components/Lectures';
import Footer from '../src/components/Footer';
import { menuLinkStyle } from '../src/styles/commonStyles';
import { t } from '../src/utils/i18n';

const App = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

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
                marginLeft: isLg ? '15%' : '',
                width: isLg ? '60%' : '',
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
