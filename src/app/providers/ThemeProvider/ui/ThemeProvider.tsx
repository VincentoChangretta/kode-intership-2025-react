import { ReactNode, useMemo, useState } from 'react';
import { LOCALSTORE_THEME, ThemeContext, Themes } from '../lib/ThemeContext';

const initialTheme = (localStorage.getItem(LOCALSTORE_THEME) as Themes) || Themes.LIGHT;

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const [theme, setTheme] = useState<Themes>(initialTheme);

  const defaultValue = useMemo(() => {
    return {
      theme,
      setTheme,
    };
  }, [theme]);

  return <ThemeContext.Provider value={defaultValue}>{children}</ThemeContext.Provider>;
};
