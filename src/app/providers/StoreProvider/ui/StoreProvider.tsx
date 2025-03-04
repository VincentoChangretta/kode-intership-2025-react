import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children?: ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  return <Provider store={createReduxStore()}>{children}</Provider>;
};
