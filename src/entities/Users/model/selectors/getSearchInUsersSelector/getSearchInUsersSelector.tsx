import { StateSchema } from 'app/providers/StoreProvider';

export const getSearchInUsersSelector = (state: StateSchema) => state.users.searchInUsers;
