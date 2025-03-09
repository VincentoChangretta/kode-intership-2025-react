import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/config/deepPartial/deepPartial';
import { getIsLoadingSelector } from './getIsLoadingSelector';

describe('состояние загрузки', () => {
  test('состояние загрузки', () => {
    const state: DeepPartial<StateSchema> = {
      users: {
        isLoading: false,
      },
    };
    expect(getIsLoadingSelector(state as StateSchema)).toBe(false);
  });
  test('состояние загрузки: isLoading = false', () => {
    const state: DeepPartial<StateSchema> = {
      users: {
        isLoading: false,
      },
    };
    const result = getIsLoadingSelector(state as StateSchema);
    expect(result).toBe(false);
    expect(typeof result).toBe('boolean');
  });
});
