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
              <meta name="google-site-verification" content="5KWsgLhz5GaPE5yrzyKV-uNaOy228-mPTxDY8zbR_ic" />
              <meta name="msvalidate.01" content="276D711C5CB2B205312DFA3763893D1F" />
          {/* Using next/font for Inter, Tajawal, Merriweather; external font links removed */}

          {/* Hreflang tags are generated per-page in the SEO component to avoid duplication */}

          {/* Favicons placeholders (replace with your assets) */}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

          {/* Microsoft Clarity tracking code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "tjj89qw6wn");
              `
            }}
          />

          {/* Hotjar tracking code */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:6535512,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

