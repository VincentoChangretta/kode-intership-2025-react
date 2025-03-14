import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';
import { saveTimeToLocalStorage, storedTimeName } from './saveTimeToLocalStorage';

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('должен сохранять метку времени в localStorage с правильным ключом для указанного департамента', () => {
  const department: AllDepartments = AllDepartments.All;
  const fakeTimestamp = 1616161616161;
  jest.spyOn(Date, 'now').mockReturnValue(fakeTimestamp);
  saveTimeToLocalStorage(department);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    storedTimeName(department),
    JSON.stringify(fakeTimestamp),
  );
});
