import React, { FC } from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Navigation from '../src/components/Navigation';
import Container from '@material-ui/core/Container';
import AboutMe from '../src/components/AboutMe';
import Contact from '../src/components/Contact';
import Lectures from '../src/components/Lectures';
import Footer from '../src/components/Footer';
import { useCommonStyles } from '../src/styles/commonStyles';
import { t } from '../src/utils/i18n';

const useStyles = makeStyles((theme) => ({
  h6: {
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      marginLeft: '15%',
      width: '60%',
      flexGrow: 0,
    },
  },
  container: {
    marginTop: '5em',
  },
  navbar: {
    flexGrow: 1,
  },
}));

const App: FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();

  return (
    <div>
      <div className={classes.navbar}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={classes.h6}>
              <a href="#home" className={commonClasses.menuLinkStyle}>
                {t('pageTitle')}
              </a>
            </Typography>
            <Navigation />
          </Toolbar>
        </AppBar>
        <Container id="home" maxWidth="md" className={classes.container}>
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
