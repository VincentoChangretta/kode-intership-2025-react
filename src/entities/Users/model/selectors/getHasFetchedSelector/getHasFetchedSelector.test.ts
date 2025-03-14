import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';
import { getHasFetchedSelector } from './getHasFetchedSelector';

describe('состояние поиска', () => {
  test('состояние поиска', () => {
    const state: DeepPartial<StateSchema> = {
      users: {
        hasFetched: true,
      },
    };
    expect(getHasFetchedSelector(state as StateSchema)).toBe(true);
  });
});
