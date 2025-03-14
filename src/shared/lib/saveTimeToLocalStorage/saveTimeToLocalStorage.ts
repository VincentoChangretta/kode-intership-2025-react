import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';

export const storedTimeName = (department: AllDepartments) => {
  return `time-${department}`;
};

export const saveTimeToLocalStorage = (department: AllDepartments) => {
  const timestamp = Date.now();
  localStorage.setItem(storedTimeName(department), JSON.stringify(timestamp));
};
