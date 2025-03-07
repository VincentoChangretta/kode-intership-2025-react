import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';
import { getSortBySelector } from './getSortBySelector';
import { SortTypes } from '../../slices/usersSlice';

describe('состояние поиска', () => {
  test('состояние поиска', () => {
    const state: DeepPartial<StateSchema> = {
      users: {
        sortBy: SortTypes.byDate,
      },
    };
    expect(getSortBySelector(state as StateSchema)).toBe(SortTypes.byDate);
  });
});
