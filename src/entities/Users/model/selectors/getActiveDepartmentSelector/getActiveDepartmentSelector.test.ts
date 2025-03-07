import { StateSchema } from 'app/providers/StoreProvider';
import { getActiveDepartmentSelector } from './getActiveDepartmentSelector';
import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';
import type { DeepPartial } from 'shared/config/deepPartial/deepPartial';

describe('активный департамент', () => {
  test('активный департамент', () => {
    const state: DeepPartial<StateSchema> = {
      users: {
        activeDepartment: AllDepartments.Android,
      },
    };
    expect(getActiveDepartmentSelector(state as StateSchema)).toEqual(AllDepartments.Android);
  });
});
