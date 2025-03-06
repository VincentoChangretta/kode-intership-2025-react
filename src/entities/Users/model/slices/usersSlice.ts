import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from '../types/userSchema';
import {
  AllDepartments,
  departmentDetails,
} from 'shared/config/navDepartmentConfig/navDepartmentConfig';

export interface UsersState {
  isLoading: boolean;
  searchInUsers: string;
  activeDepartment: AllDepartments;
  departments: {
    [key in keyof typeof departmentDetails]: UserSchema[];
  };
  activeUser: UserSchema;
}

const initialState: UsersState = {
  isLoading: null,
  searchInUsers: '',
  activeDepartment: null,
  departments: {
    [AllDepartments.All]: [],
    [AllDepartments.Android]: [],
    [AllDepartments.IOS]: [],
    [AllDepartments.Design]: [],
    [AllDepartments.Management]: [],
    [AllDepartments.QA]: [],
    [AllDepartments.BackOffice]: [],
    [AllDepartments.Frontend]: [],
    [AllDepartments.HR]: [],
    [AllDepartments.PR]: [],
    [AllDepartments.Backend]: [],
    [AllDepartments.Support]: [],
    [AllDepartments.Analytics]: [],
  },
  activeUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // для общей вкладки
    setUsers(state, action: PayloadAction<UserSchema[]>) {
      const departmentKey = departmentDetails.all.link;
      //  Проверка что ключ есть в departmentDetails
      if (departmentKey in state.departments) {
        state.departments[departmentKey] = action.payload;
      }
    },
    //  для установки активного департамента
    setActiveDepartmentKey(state, action: PayloadAction<AllDepartments>) {
      state.activeDepartment = action.payload;
    },
    //  для отдельных вкладок
    setUsersByDepartment(
      state,
      action: PayloadAction<{ department: AllDepartments; users: UserSchema[] }>,
    ) {
      const { department, users } = action.payload;
      if (state.departments[department]) {
        state.departments[department] = users;
      }
    },
    //  для поиска
    setSearchInUsers(state, action: PayloadAction<string>) {
      state.searchInUsers = action.payload;
    },
    //  для активного пользователя
    setActiveUser(state, action: PayloadAction<UserSchema>) {
      state.activeUser = action.payload;
    },
    //  для состояния загрузки
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
