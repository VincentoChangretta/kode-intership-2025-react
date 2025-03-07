import { StateSchema } from 'app/providers/StoreProvider';

export const getSortBySelector = (state: StateSchema) => state.users.sortBy;
