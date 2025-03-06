import { ReactNode, useMemo, useState } from 'react';
import { ThemeContext, Themes } from '../lib/ThemeContext';
import { setInitialTheme } from '../lib/setInitialTheme';

interface ThemeProviderProps {
  children: ReactNode;
}
const initialTheme = setInitialTheme();

console.log(initialTheme);

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;
  const [theme, setTheme] = useState<Themes>(initialTheme);
  document.body.className = theme;

  const defaultValue = useMemo(() => {
    return {
      theme,
      setTheme,
    };
  }, [theme]);

  return <ThemeContext.Provider value={defaultValue}>{children}</ThemeContext.Provider>;
};
