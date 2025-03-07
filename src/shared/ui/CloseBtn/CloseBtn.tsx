import { useCallback } from 'react';
import { Button, ButtonTheme } from '../Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './CloseBtn.module.scss';

interface CloseBtnProps {
  className?: string;
  onClose: (prev: boolean) => void;
}

export const CloseBtn = (props: CloseBtnProps) => {
  const { className, onClose } = props;

  const handleOnClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  return (
    <Button
      className={classNames(cls.closeBtn, {}, [className])}
      theme={ButtonTheme.ICON}
      onClick={handleOnClose}
    >
      <svg viewBox="0 0 10 10">
        <path d="M9.73 0.26C10.08 0.61 10.08 1.18 9.73 1.53L6.27 5L9.73 8.46C10.05 8.78 10.08 9.29 9.81 9.64L9.73 9.73C9.38 10.08 8.81 10.08 8.46 9.73L5 6.27L1.53 9.73C1.18 10.08 0.61 10.08 0.26 9.73C-0.09 9.38 -0.09 8.81 0.26 8.46L3.72 5L0.26 1.53C-0.06 1.21 -0.09 0.7 0.18 0.35L0.26 0.26C0.61 -0.09 1.18 -0.09 1.53 0.26L5 3.72L8.46 0.26C8.81 -0.09 9.38 -0.09 9.73 0.26Z" />
      </svg>
    </Button>
  );
};
