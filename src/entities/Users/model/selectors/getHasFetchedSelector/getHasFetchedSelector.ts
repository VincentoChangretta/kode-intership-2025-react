import { StateSchema } from 'app/providers/StoreProvider';

export const getHasFetchedSelector = (state: StateSchema) => state.users.hasFetched;
