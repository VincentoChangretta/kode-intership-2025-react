import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';
import { getPrevDepartmentDataSelector } from './getPrevDepartmentDataSelector';

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

    const array = [activeUser, activeUser];

    const state: DeepPartial<StateSchema> = {
      users: {
        prevDepartmentData: array,
      },
    };
    expect(getPrevDepartmentDataSelector(state as StateSchema)).toEqual(array);
  });
});
