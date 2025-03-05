import { StateSchema } from 'app/providers/StoreProvider';

export const getUsersSelector = (state: StateSchema) => state.users;
