import { ReactNode } from 'react';
import cls from './Modal.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isActive: boolean;
  onClose?: (prev: boolean) => void;
}

export const Modal = (props: ModalProps) => {
  const { children, className, isActive, onClose } = props;

  const closeHandler = () => {
    if (onClose) {
      onClose(false);
    }
  };

  return (
    <div
      className={classNames(cls.modalBg, { [cls.modalBgActive]: isActive }, [])}
      onClick={closeHandler}
    >
      <div
        className={classNames(cls.modal, { [cls.modalActive]: isActive }, [className])}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
