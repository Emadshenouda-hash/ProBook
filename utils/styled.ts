// Compatibility shim to ensure default import works across different TS/ESM interop modes
// and preserves the styled.tag helpers (e.g., styled.div, styled.footer).
import * as styledComponents from 'styled-components';

// Cast to any to avoid type mismatches across environments/build tools
const sc: any = styledComponents as any;
const styled: any = sc.default || sc;

export const createGlobalStyle = sc.createGlobalStyle;
export const ThemeProvider = sc.ThemeProvider;
export const useTheme = sc.useTheme;
export const ServerStyleSheet = sc.ServerStyleSheet;
export const css = sc.css;

export default styled;

