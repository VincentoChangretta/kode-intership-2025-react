import { StateSchema } from 'app/providers/StoreProvider';

export const getActiveUserSelector = (state: StateSchema) => state.users.activeUser;
