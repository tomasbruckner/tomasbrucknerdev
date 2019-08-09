import React from 'react';
import App, { Container } from 'next/app';
import { appWithTranslation } from '../utils/i18n';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
