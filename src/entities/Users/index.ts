import { getUsers } from './api/getUsers/getUsers';
import type { UserSchema } from './model/types/userSchema';
import { usersActions } from './model/slices/usersSlice';
import { usersReducer } from './model/slices/usersSlice';
import type { UsersState } from './model/slices/usersSlice';
import { getUsersStateSelector } from './model/selectors/getUsersValueSelector/getUsersStateSelector';

export { getUsers, UserSchema, usersActions, usersReducer, UsersState, getUsersStateSelector };
