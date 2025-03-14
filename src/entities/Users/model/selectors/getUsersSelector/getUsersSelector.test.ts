import { StateSchema } from 'app/providers/StoreProvider';
import { getUsersSelector } from './getUsersSelector';
import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';
import { SortTypes } from '../../slices/usersSlice';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';

describe('состояние users', () => {
  test('состояние users', () => {
    const activeUser = {
      avatarUrl: 'url',
      birthday: '2002-10-20',
      department: 'department',
      firstName: 'David',
      id: 'david-id',
      lastName: 'Changretta',
      phone: '+7999999999',
      position: 'frontend',
      userTag: 'sm',
    };

    const usersState = {
      sortBy: SortTypes.byDate,
      searchInUsers: 'Hello!',
      activeDepartment: AllDepartments.All,
      isLoading: false,
      activeUser: activeUser,
      departments: {
        [AllDepartments.All]: [activeUser],
        [AllDepartments.Android]: [activeUser],
        [AllDepartments.IOS]: [activeUser],
        [AllDepartments.Design]: [activeUser],
        [AllDepartments.Management]: [activeUser],
        [AllDepartments.QA]: [activeUser],
        [AllDepartments.BackOffice]: [activeUser],
        [AllDepartments.Frontend]: [activeUser],
        [AllDepartments.HR]: [activeUser],
        [AllDepartments.PR]: [activeUser],
        [AllDepartments.Backend]: [activeUser],
        [AllDepartments.Support]: [activeUser],
        [AllDepartments.Analytics]: [activeUser],
      },
    };

    const state: DeepPartial<StateSchema> = {
      users: usersState,
    };
    expect(getUsersSelector(state as StateSchema)).toEqual(usersState);
  });
});
