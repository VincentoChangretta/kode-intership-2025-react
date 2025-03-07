import { StateSchema } from 'app/providers/StoreProvider';
import { getActiveUserSelector } from './getActiveUserSelector';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';

describe('активный пользователь', () => {
  test('активный пользователь', () => {
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

    const state: DeepPartial<StateSchema> = {
      users: {
        activeUser: activeUser,
      },
    };

    expect(getActiveUserSelector(state as StateSchema)).toEqual(activeUser);
  });
});
