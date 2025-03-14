import { StateSchema } from 'app/providers/StoreProvider';

export const getUsersRefreshSelector = (state: StateSchema) => state.users.refresh;
