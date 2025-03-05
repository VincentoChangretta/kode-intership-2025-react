import { createSelector } from '@reduxjs/toolkit';
import { getUsersSelector } from '../getUsersSelector/getUsersSelector';
import { UsersState } from '../../slices/usersSlice';
import { getActiveDepartmentSelector } from '../getActiveDepartmentSelector/getActiveDepartmentSelector';

export const getUsersStateSelector = createSelector(
  getUsersSelector,
  getActiveDepartmentSelector,
  (users: UsersState) => users,
);
