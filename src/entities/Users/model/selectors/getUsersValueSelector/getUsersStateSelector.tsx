import { createSelector } from '@reduxjs/toolkit';
import { getUsersSelector } from '../getUsersSelector/getUsersSelector';
import { UsersState } from '../../slices/usersSlice';
import { getActiveDepartmentSelector } from '../getActiveDepartmentSelector/getActiveDepartmentSelector';
import { getSearchInUsersSelector } from '../getSearchInUsersSelector/getSearchInUsersSelector';
import { getActiveUserSelector } from '../getActiveUserSelector/getActiveUserSelector';

export const getUsersStateSelector = createSelector(
  getUsersSelector,
  getActiveDepartmentSelector,
  getSearchInUsersSelector,
  getActiveUserSelector,
  (users: UsersState) => users,
);
