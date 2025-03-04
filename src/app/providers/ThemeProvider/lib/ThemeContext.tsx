import { createContext } from 'react';

export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeContextProps {
  theme?: Themes;
  setTheme?: (theme: Themes) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCALSTORE_THEME = 'theme';
