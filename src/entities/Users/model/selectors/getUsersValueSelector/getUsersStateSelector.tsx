import { createSelector } from '@reduxjs/toolkit';
import { getUsersSelector } from '../getUsersSelector/getUsersSelector';
import { UsersState } from '../../slices/usersSlice';
import { getActiveDepartmentSelector } from '../getActiveDepartmentSelector/getActiveDepartmentSelector';
import { getSearchInUsersSelector } from '../getSearchInUsersSelector/getSearchInUsersSelector';
import { getActiveUserSelector } from '../getActiveUserSelector/getActiveUserSelector';
import { getSortBySelector } from '../getSortBySelector/getSortBySelector';
import { getPrevDepartmentDataSelector } from '../getPrevDepartmentDataSelector/getPrevDepartmentDataSelector';
import { getHasFetchedSelector } from '../getHasFetchedSelector/getHasFetchedSelector';

export const getUsersStateSelector = createSelector(
  getUsersSelector,
  getActiveDepartmentSelector,
  getSearchInUsersSelector,
  getActiveUserSelector,
  getSortBySelector,
  getPrevDepartmentDataSelector,
  getHasFetchedSelector,
  (users: UsersState) => users,
);
