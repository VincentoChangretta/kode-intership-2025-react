import { StateSchema } from 'app/providers/StoreProvider';

export const getIsLoadingSelector = (state: StateSchema) => state.users.isLoading;
