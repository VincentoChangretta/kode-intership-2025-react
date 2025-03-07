import { StateSchema } from 'app/providers/StoreProvider';
import { getSearchInUsersSelector } from './getSearchInUsersSelector';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';

describe('состояние поиска', () => {
  test('состояние поиска', () => {
    const state: DeepPartial<StateSchema> = {
      users: {
        searchInUsers: 'Hello!',
      },
    };
    expect(getSearchInUsersSelector(state as StateSchema)).toBe('Hello!');
  });
});
