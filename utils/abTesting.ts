// Simple A/B testing utility
export interface ABTest {
  name: string;
  variants: string[];
  weights?: number[]; // Optional: custom weights for variants
}

export interface ABTestResult {
  testName: string;
  variant: string;
  userId: string;
}

// Default A/B tests for ProBook Solutions
export const ABTests: Record<string, ABTest> = {
  hero_cta: {
    name: 'hero_cta',
    variants: ['Book Consultation', 'Get Started', 'Schedule Call'],
    weights: [0.4, 0.3, 0.3]
  },
  pricing_highlight: {
    name: 'pricing_highlight',
    variants: ['growth', 'starter', 'cfo'],
    weights: [0.5, 0.3, 0.2]
  },
  consultation_form: {
    name: 'consultation_form',
    variants: ['calendly', 'form'],
    weights: [0.6, 0.4]
  },
  testimonial_style: {
    name: 'testimonial_style',
    variants: ['cards', 'carousel', 'grid']
  }
};

// Get user ID (simple implementation)
function getUserId(): string {
  if (typeof window === 'undefined') return 'server';
  
  let userId = localStorage.getItem('ab_test_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('ab_test_user_id', userId);
  }
  return userId;
}

// Simple hash function for consistent variant assignment
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Get variant for a test
export function getABTestVariant(testName: string): string {
  const test = ABTests[testName];
  if (!test) {
    console.warn(`AB Test "${testName}" not found`);
    return 'default';
  }

  const userId = getUserId();
  const hash = hashString(`${testName}_${userId}`);
  
  // Use custom weights if provided, otherwise equal distribution
  const weights = test.weights || test.variants.map(() => 1 / test.variants.length);
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  
  let random = (hash % 10000) / 10000; // Convert hash to 0-1 range
  random *= totalWeight;
  
  let cumulativeWeight = 0;
  for (let i = 0; i < test.variants.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      return test.variants[i];
    }
  }
  
  return test.variants[test.variants.length - 1]; // Fallback
}

// Track A/B test conversion
export function trackABTestConversion(testName: string, conversionType: string, value?: number) {
  const variant = getABTestVariant(testName);
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ab_test_conversion', {
      test_name: testName,
      variant: variant,
      conversion_type: conversionType,
      value: value,
      event_category: 'ab_testing'
    });
  }
  
  // Store in localStorage for analysis
  const conversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
  conversions.push({
    testName,
    variant,
    conversionType,
    value,
    timestamp: Date.now()
  });
  localStorage.setItem('ab_test_conversions', JSON.stringify(conversions));
}

// Get A/B test results
export function getABTestResults(): ABTestResult[] {
  if (typeof window === 'undefined') return [];
  
  const conversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
  return conversions;
}

// Clear A/B test data (for testing)
export function clearABTestData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('ab_test_user_id');
    localStorage.removeItem('ab_test_conversions');
  }
}

// React hook for A/B testing
export function useABTest(testName: string) {
  const variant = getABTestVariant(testName);
  
  const trackConversion = (conversionType: string, value?: number) => {
    trackABTestConversion(testName, conversionType, value);
  };
  
  return {
    variant,
    trackConversion,
    isVariant: (variantName: string) => variant === variantName
  };
}