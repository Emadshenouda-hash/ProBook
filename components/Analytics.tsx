import Script from 'next/script';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useConsent } from '../context/ConsentContext';

/**
 * Google Analytics 4 implementation with best practices:
 * - Automatic page view tracking on route changes
 * - Enhanced measurement (scrolls, outbound links, file downloads, video engagement)
 * - Cookie consent compliance
 * - Debug mode in development
 */
export default function Analytics() {
  const router = useRouter();
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || 'G-MLHTJEZ3ZS';
  const isDev = process.env.NODE_ENV === 'development';
  const { consent } = useConsent();

  // Track page views on route change (only when analytics consent is granted)
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (consent.analytics && typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', gaId, {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, gaId, consent.analytics]);
  
  return (
    <>
      {/* Google Analytics 4 - gtag.js (load but do not send events until consent) */}
      {consent.analytics && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
      )}
      
      {/* GA4 Configuration with Enhanced Measurement (only when consented) */}
      {consent.analytics && (
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('js', new Date());
          
          // Configure GA4 with best practices
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
            
            // Enhanced measurement features
            enhanced_measurement: {
              scrolls: true,            // Track 90% scroll depth
              outbound_clicks: true,    // Track external links
              site_search: false,       // Not needed for your site
              video_engagement: false,  // Enable if you add videos
              file_downloads: true,     // Track PDF downloads
              page_changes: true        // SPA route changes
            },
            
            // Cookie settings (GDPR/CCPA compliant)
            cookie_flags: 'SameSite=None;Secure',
            cookie_expires: 63072000,  // 2 years
            
            // Custom dimensions
            custom_map: {
              dimension1: 'user_language',
              dimension2: 'user_theme'
            },
            
            // User properties
            user_properties: {
              language: document.documentElement.lang || 'en',
              theme_mode: localStorage.getItem('themeMode') || 'light',
              crm_source: sessionStorage.getItem('utm_source') || 'direct'
            },
            
            // Debug mode (development only)
            debug_mode: ${isDev}
          });
          
          // Track language preference
          gtag('set', 'user_properties', {
            language: document.documentElement.lang || 'en'
          });
          
          // Custom event tracking function
          window.trackEvent = function(eventName, eventParams) {
            gtag('event', eventName, eventParams);
          };
          
          console.log('✅ Google Analytics initialized: ${gaId}');
        `}
        </Script>
      )}

      {/* Enhanced E-commerce Tracking (only when consented) */}
      {consent.analytics && (
        <Script id="ga-ecommerce" strategy="afterInteractive">
          {`
          // Track consultation bookings as conversions
          window.trackConsultation = function(data) {
            gtag('event', 'generate_lead', {
              currency: 'USD',
              value: 1000,  // Estimated consultation value
              event_category: 'consultation',
              event_label: data.source || 'form',
              method: data.method || 'contact_form',
              service_type: data.services?.join(',') || 'general'
            });
            
            // Also track as conversion
            gtag('event', 'conversion', {
              send_to: '${gaId}/consultation_booking',
              value: 1000,
              currency: 'USD'
            });
          };
          
          // Track CTA clicks
          window.trackCTA = function(label, href) {
            gtag('event', 'cta_click', {
              event_category: 'engagement',
              event_label: label,
              link_url: href,
              link_domain: new URL(href, window.location.origin).hostname
            });
          };
          
          // Track file downloads
          window.trackDownload = function(filename) {
            gtag('event', 'file_download', {
              event_category: 'engagement',
              event_label: filename,
              file_extension: filename.split('.').pop()
            });
          };
        `}
        </Script>
      )}
    </>
  );
}