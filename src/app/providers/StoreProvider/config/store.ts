import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { usersReducer } from 'entities/Users/model/slices/usersSlice';

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      users: usersReducer,
    },
    preloadedState: initialState,
  });
}
