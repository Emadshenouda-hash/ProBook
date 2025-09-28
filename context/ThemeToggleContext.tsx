import React from 'react';

// Context interface defines the shape of the theme toggle context.
export interface ThemeToggleContextProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

// Default context values; toggleTheme is a no-op by default.
const ThemeToggleContext = React.createContext<ThemeToggleContextProps>({
  mode: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {}
});

export default ThemeToggleContext;