import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';
import { getUsersRefreshSelector } from './getUsersRefreshSelector';

describe('состояние обновления пользователей', () => {
  test('состояние обновления пользователей', () => {
    const state: DeepPartial<StateSchema> = {
      users: {
        refresh: true,
      },
    };
    expect(getUsersRefreshSelector(state as StateSchema)).toBe(true);
  });
});
