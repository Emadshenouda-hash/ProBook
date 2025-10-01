import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HeatmapAnalytics() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Hotjar integration
    const initHotjar = () => {
      if (process.env.NEXT_PUBLIC_HOTJAR_ID) {
        (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
          h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
          h._hjSettings = { hjid: process.env.NEXT_PUBLIC_HOTJAR_ID, hjsv: 6 };
          a = o.getElementsByTagName('head')[0];
          r = o.createElement('script'); r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
      }
    };

    // Crazy Egg integration
    const initCrazyEgg = () => {
      if (process.env.NEXT_PUBLIC_CRAZYEGG_ID) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `//script.crazyegg.com/pages/scripts/${process.env.NEXT_PUBLIC_CRAZYEGG_ID}.js`;
        script.async = true;
        document.head.appendChild(script);
      }
    };

    // Microsoft Clarity integration
    const initClarity = () => {
      // Use the specific Clarity ID for probooksolutions.org
      const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || 'tjj89qw6wn';
      
      (function(c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
        c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", clarityId);
    };

    // Initialize all heatmap services
    initHotjar();
    initCrazyEgg();
    initClarity();

    // Track page views for heatmap services
    const trackPageView = () => {
      // Hotjar page view tracking
      if ((window as any).hj) {
        (window as any).hj('stateChange', router.asPath);
      }

      // Clarity page view tracking
      if ((window as any).clarity) {
        (window as any).clarity('set', 'page', router.asPath);
      }
    };

    // Track initial page view
    trackPageView();

    // Track route changes
    const handleRouteChange = () => {
      setTimeout(trackPageView, 100); // Small delay to ensure page is loaded
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return null;
}

// Environment variables needed (add to .env.local):
// NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
// NEXT_PUBLIC_CRAZYEGG_ID=your_crazyegg_id  
// NEXT_PUBLIC_CLARITY_ID=your_clarity_id