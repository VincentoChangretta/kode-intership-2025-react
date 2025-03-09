import { saveTimeToLocalStorage } from './saveTimeToLocalStorage';
import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(Date, 'now').mockImplementation(() => 1000000000000);
});

describe('saveTimeToLocalStorage', () => {
  test('Должен сохранять правильный time в localStorage', () => {
    saveTimeToLocalStorage(AllDepartments.All);
    const storedTime = localStorage.getItem(AllDepartments.All);
    expect(storedTime).not.toBeNull();
    const parsedTime = JSON.parse(storedTime);
    expect(parsedTime).toBe(1000000000000);
  });

  test('Должен корректно сохранять time для другого департамента', () => {
    const department = AllDepartments.Analytics;
    saveTimeToLocalStorage(department);
    const storedTime = localStorage.getItem(department);
    expect(storedTime).not.toBeNull();
    const parsedTime = JSON.parse(storedTime);
    expect(parsedTime).toBe(1000000000000);
  });
});
