import { StateSchema } from 'app/providers/StoreProvider';

export const getPrevDepartmentDataSelector = (state: StateSchema) => state.users.prevDepartmentData;
