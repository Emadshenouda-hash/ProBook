// Conversion tracking utilities
export interface ConversionEvent {
  event_name: string;
  value?: number;
  currency?: string;
  event_category?: string;
  event_label?: string;
  custom_parameters?: Record<string, any>;
}

// Track conversion events
export function trackConversion(event: ConversionEvent) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if ((window as any).gtag) {
    (window as any).gtag('event', event.event_name, {
      value: event.value,
      currency: event.currency || 'USD',
      event_category: event.event_category,
      event_label: event.event_label,
      ...event.custom_parameters
    });
  }

  // Facebook Pixel (if available)
  if ((window as any).fbq) {
    (window as any).fbq('track', event.event_name, {
      value: event.value,
      currency: event.currency || 'USD',
      content_name: event.event_label,
      ...event.custom_parameters
    });
  }

  // LinkedIn Insight Tag (if available)
  if ((window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: event.event_name });
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Conversion tracked:', event);
  }
}

// Specific conversion events for ProBook Solutions
export const ConversionEvents = {
  // Consultation bookings
  consultationBooked: (source: string = 'unknown') => trackConversion({
    event_name: 'generate_lead',
    value: 1000, // Estimated lead value
    currency: 'USD',
    event_category: 'consultation',
    event_label: source,
    custom_parameters: {
      lead_type: 'consultation',
      source: source
    }
  }),

  // Contact form submissions
  contactFormSubmitted: (formType: string = 'contact') => trackConversion({
    event_name: 'generate_lead',
    value: 500,
    currency: 'USD',
    event_category: 'contact',
    event_label: formType,
    custom_parameters: {
      lead_type: 'contact',
      form_type: formType
    }
  }),

  // Pricing page views
  pricingPageViewed: (plan?: string) => trackConversion({
    event_name: 'view_item',
    event_category: 'pricing',
    event_label: plan || 'pricing_page',
    custom_parameters: {
      item_name: plan || 'pricing_page',
      item_category: 'services'
    }
  }),

  // Service page engagement
  servicePageEngaged: (service: string) => trackConversion({
    event_name: 'view_item',
    event_category: 'services',
    event_label: service,
    custom_parameters: {
      item_name: service,
      item_category: 'accounting_services'
    }
  }),

  // File downloads
  resourceDownloaded: (resourceName: string) => trackConversion({
    event_name: 'file_download',
    event_category: 'resources',
    event_label: resourceName,
    custom_parameters: {
      file_name: resourceName,
      file_type: 'pdf'
    }
  }),

  // Email signups
  emailSignup: (source: string) => trackConversion({
    event_name: 'sign_up',
    event_category: 'email',
    event_label: source,
    custom_parameters: {
      method: 'email',
      source: source
    }
  })
};

// Enhanced tracking for specific user actions
export function trackUserJourney(step: string, details?: Record<string, any>) {
  trackConversion({
    event_name: 'user_journey',
    event_category: 'engagement',
    event_label: step,
    custom_parameters: {
      journey_step: step,
      ...details
    }
  });
}

// Track page performance
export function trackPagePerformance(pageName: string, loadTime: number) {
  trackConversion({
    event_name: 'page_timing',
    event_category: 'performance',
    event_label: pageName,
    custom_parameters: {
      page_name: pageName,
      load_time: loadTime,
      performance_rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs_improvement' : 'poor'
    }
  });
}