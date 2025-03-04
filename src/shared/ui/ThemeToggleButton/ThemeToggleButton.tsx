import { ButtonHTMLAttributes, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '../Button/Button';
import cls from './ThemeToggleButton.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';

interface ThemeToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const ThemeToggleButton = (props: ThemeToggleButtonProps) => {
  const { className } = props;
  const { toggleStandartTheme } = useTheme();
  const [sliderMove, setSliderMove] = useState<boolean>();
  const onToggle = useCallback(() => {
    setSliderMove(prev => !prev);
    toggleStandartTheme();
  }, [toggleStandartTheme]);

  return (
    <Button
      theme={ButtonTheme.TOGGLE_THEME}
      className={classNames(cls.ThemeToggleButton, {}, [className])}
      onClick={onToggle}
    >
      <span className={classNames(cls.slider, { [cls.active]: sliderMove })}></span>
    </Button>
  );
};
