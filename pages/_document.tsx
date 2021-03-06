import React from 'react';
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import CssBaseline from '@material-ui/core/CssBaseline';
import Meta from '../src/components/Meta';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render(): JSX.Element {
    return (
      <Html lang="cs">
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
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145274106-1" />
          {/* eslint-disable react/no-danger */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'UA-145274106-1');
    `,
            }}
          />
          {/* eslint-enable react/no-danger */}
          <Meta />
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
            margin: 0px;
            font-size: 16px;
            font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background-color: #f6f6f6;
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
