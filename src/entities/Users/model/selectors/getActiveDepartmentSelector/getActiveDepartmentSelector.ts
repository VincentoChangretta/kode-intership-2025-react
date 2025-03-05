import { StateSchema } from 'app/providers/StoreProvider';

export const getActiveDepartmentSelector = (state: StateSchema) => state.users.activeDepartment;
