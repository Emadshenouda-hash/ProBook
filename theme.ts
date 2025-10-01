import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  colors: {
    /*
     * Use a more saturated violet palette for the primary colour. A brighter
     * primary improves contrast and lends a more modern feel to buttons,
     * links and accents across the site. The hover state is a slightly
     * darker shade to provide clear visual feedback.
     */
    primary: '#6d28d9',
    primaryHover: '#5b21b6',
    /*
     * Secondary remains the same bright blue to complement the purple. If you
     * wish to experiment further with the palette, adjust this value as
     * desired.
     */
    secondary: '#0ea5e9',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#111827',
    mutedText: '#6b7280',
    border: '#e5e7eb',
    /*
     * Set link colours to match the primary palette so that navigation links
     * harmonise with buttons and other controls.
     */
    link: '#6d28d9',
    linkHover: '#5b21b6',
    success: '#198754',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#0dcaf0'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 8px rgba(0,0,0,0.08)',
    lg: '0 6px 20px rgba(0,0,0,0.12)'
  },
  transitions: {
    fast: '150ms cubic-bezier(0.22, 1, 0.36, 1)',
    base: '300ms cubic-bezier(0.22, 1, 0.36, 1)'
  },
  typography: {
    fontFamilySansLatin: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
    fontFamilySansArabic: "'Tajawal', 'Noto Sans Arabic', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
    fontFamilySerifHeading: "'Merriweather', Georgia, 'Times New Roman', Times, serif",
    lineHeightBase: 1.6,
    scale: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.5rem',
      h4: '1.125rem',
      h5: '1rem',
      h6: '0.875rem',
      body: '1rem',
      small: '0.875rem'
    }
  },
  layout: {
    containerMaxWidth: '1200px',
    breakpoints: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    }
  }
};

// Define a dark theme by overriding colour palettes while preserving spacing, typography, etc.
const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    /*
     * Tweak the primary palette for dark mode to maintain contrast against
     * dark backgrounds. These values are slightly lighter than the light
     * theme counterparts so that buttons and links remain legible against
     * dark surfaces.
     */
    primary: '#a78bfa',
    primaryHover: '#8b5cf6',
    secondary: '#0ea5e9',
    background: '#111827',
    surface: '#1f2937',
    text: '#f8fafc',
    mutedText: '#9ca3af',
    border: '#374151',
    link: '#a78bfa',
    linkHover: '#8b5cf6',
    success: '#198754',
    warning: '#f59e0b',
    danger: '#dc2626',
    info: '#0dcaf0'
  }
};

export { lightTheme, darkTheme };
export default lightTheme;

