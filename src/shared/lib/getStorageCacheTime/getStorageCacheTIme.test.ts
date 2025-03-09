import { getStoredCacheTime } from './getStorageCacheTime';
import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';

beforeEach(() => {
  localStorage.clear();
});

describe('getStoredCacheTime', () => {
  test('Данные отсутствуют в localStorage', () => {
    expect(getStoredCacheTime(AllDepartments.All)).toBe(true);
  });

  test('Данные в localStorage, но устарели (прошло больше 5 минут)', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1000000000000);
    const pastTime = 1000000000000 - 6 * 60 * 1000;
    localStorage.setItem(AllDepartments.All, JSON.stringify(pastTime));
    expect(getStoredCacheTime(AllDepartments.All)).toBe(true);
  });

  test('Данные в localStorage актуальны', () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1000000000000);

    const recentTime = 1000000000000 - 3 * 60 * 1000;
    localStorage.setItem(AllDepartments.All, JSON.stringify(recentTime));
    expect(getStoredCacheTime(AllDepartments.All)).toBe(false);
  });

  test('Проверка на undefined', () => {
    expect(getStoredCacheTime(AllDepartments.All)).not.toBe(undefined);
  });

  test('Проверка на null', () => {
    localStorage.setItem(AllDepartments.All, JSON.stringify(null));
    expect(getStoredCacheTime(AllDepartments.All)).toBe(true);
  });

  test('Проверка на тип возвращаемого значения', () => {
    const result = getStoredCacheTime(AllDepartments.All);
    expect(typeof result).toBe('boolean');
  });
});
