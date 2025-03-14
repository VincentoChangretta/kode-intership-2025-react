import { useEffect, useState } from 'react';

export const MOBILE_MAX_SCREEN_WIDTH = 1024;

export const useScreenWitdh = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  return screenWidth;
};
