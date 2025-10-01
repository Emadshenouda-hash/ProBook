import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PerformanceMonitor() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Core Web Vitals monitoring
    const reportWebVitals = (metric: any) => {
      // Send to Google Analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          value: Math.round(metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric);
      }
    };

    // LCP (Largest Contentful Paint)
    const observerLCP = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any; // Cast to any for LCP-specific properties
      reportWebVitals({
        name: 'LCP',
        value: lastEntry.startTime,
        id: lastEntry.element?.tagName || 'unknown'
      });
    });
    observerLCP.observe({ entryTypes: ['largest-contentful-paint'] });

    // FID (First Input Delay)
    const observerFID = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        reportWebVitals({
          name: 'FID',
          value: entry.processingStart - entry.startTime,
          id: entry.name
        });
      });
    });
    observerFID.observe({ entryTypes: ['first-input'] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const observerCLS = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      reportWebVitals({
        name: 'CLS',
        value: clsValue,
        id: 'cumulative'
      });
    });
    observerCLS.observe({ entryTypes: ['layout-shift'] });

    // FCP (First Contentful Paint)
    const observerFCP = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        reportWebVitals({
          name: 'FCP',
          value: entry.startTime,
          id: 'first-contentful-paint'
        });
      });
    });
    observerFCP.observe({ entryTypes: ['paint'] });

    // Cleanup
    return () => {
      observerLCP.disconnect();
      observerFID.disconnect();
      observerCLS.disconnect();
      observerFCP.disconnect();
    };
  }, [router.asPath]);

  return null;
}