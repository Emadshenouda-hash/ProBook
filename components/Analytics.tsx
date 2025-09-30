import Script from 'next/script';

/**
 * Analytics component injects the Google Analytics tracking scripts at
 * runtime. It reads the GA ID from the NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
 * environment variable. If the ID is not defined, no scripts are
 * rendered. The scripts load after the page becomes interactive to avoid
 * blocking the initial render.
 */
export default function Analytics() {
  // Use environment variable or fallback to your GA4 ID
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-MLHTJEZ3ZS';
  
  return (
    <>
      {/* Google tag (gtag.js) - Load the gtag script asynchronously */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      {/* Initialize gtag and configure it with the provided ID */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { 
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}