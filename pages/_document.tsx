import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from '../utils/styled';

interface MyDocumentProps extends DocumentInitialProps {
  dir: 'ltr' | 'rtl';
  locale: string;
}

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MyDocumentProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      // Next provides locale on ctx, fallback to 'en'
      const locale = (ctx.locale as string) || 'en';
      const dir = (locale === 'ar' ? 'rtl' : 'ltr') as 'ltr' | 'rtl';

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        dir,
        locale
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const dir: 'ltr' | 'rtl' = this.props.dir || 'ltr';
    const locale: string = this.props.locale || 'en';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.probooksolutions.com';

    return (
      <Html lang={locale} dir={dir}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0b5ed7" />
          {/* Preconnects and fonts (system-safe, adjust if hosting custom fonts) */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap"
            rel="stylesheet"
          />

          {/* Hreflang for i18n */}
          <link rel="alternate" hrefLang="en" href={`${baseUrl}/`} />
          <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar`} />
          <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/`} />

          {/* Favicons placeholders (replace with your assets) */}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

