import { useContext } from 'react';
import { LOCALSTORE_THEME, ThemeContext, Themes } from './ThemeContext';

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleStandartTheme = () => {
    const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
    setTheme(newTheme);
    localStorage.setItem(LOCALSTORE_THEME, newTheme);
  };
  return { theme, toggleStandartTheme, setTheme };
};
