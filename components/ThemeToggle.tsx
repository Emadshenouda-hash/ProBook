import React from 'react';
import styled from '../utils/styled';
import type { DefaultTheme } from 'styled-components';
import { useContext } from 'react';
import ThemeToggleContext from '../context/ThemeToggleContext';

// Styled button for toggling between light and dark themes. The design is
// intentionally minimal to integrate seamlessly with the navbar. It uses
// emojis for the sun and moon to avoid any external dependencies or images.
const ToggleButton = styled('button')`
  background: none;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text};
  transition: background-color 0.2s ease, color 0.2s ease;
  &:hover {
    background-color: rgba(109, 40, 217, 0.1);
  }
`;

export default function ThemeToggle() {
  const { mode, toggleTheme } = useContext(ThemeToggleContext);
  const isDark = mode === 'dark';
  const icon = isDark ? '🌞' : '🌙';
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  return (
    <ToggleButton type="button" onClick={toggleTheme} aria-label={label} title={label}>
      <span aria-hidden="true">{icon}</span>
    </ToggleButton>
  );
}