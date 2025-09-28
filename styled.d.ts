import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      mutedText: string;
      border: string;
      success: string;
      warning: string;
      danger: string;
      info: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    radii: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    typography: {
      fontFamilySansLatin: string;
      fontFamilySansArabic: string;
      lineHeightBase: number;
      scale: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        body: string;
        small: string;
      };
    };
    layout: {
      containerMaxWidth: string;
      breakpoints: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
    };
  }
}

