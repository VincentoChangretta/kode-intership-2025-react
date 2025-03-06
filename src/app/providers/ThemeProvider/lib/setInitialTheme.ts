import { Themes } from './ThemeContext';

export const setInitialTheme = (): Themes => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log(window.matchMedia);
    return Themes.DARK;
  } else {
    return Themes.LIGHT;
  }
};
