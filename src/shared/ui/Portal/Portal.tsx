import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  element?: HTMLElement;
  // keepMounted?:
}

export const Portal = (props: PortalProps) => {
  const { children, element = document.querySelector('.app') || document.querySelector('body') } =
    props;

  return createPortal(children, element);
};
