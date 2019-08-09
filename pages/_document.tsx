import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import CssBaseline from '@material-ui/core/CssBaseline';
import Meta from '../components/Meta';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="canonical" href="https://tomasbruckner.dev" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/site.webmanifest" />
          <Meta />
          <title>Tomáš Bruckner</title>
        </Head>
        <style jsx global>{`
          html,
          body {
            height: 100%;
            margin: 0;
          }
          input,
          textarea {
            outline: none;
          }
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-size: 16px;
            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          }
          *[id]::before {
            display: block;
            content: ' ';
            margin-top: -64px;
            height: 64px;
            visibility: hidden;
            pointer-events: none;
          }
        `}</style>
        <body>
          <CssBaseline />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
