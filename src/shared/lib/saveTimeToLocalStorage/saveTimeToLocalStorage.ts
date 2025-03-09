import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';

export const saveTimeToLocalStorage = (department: AllDepartments) => {
  const timestamp = Date.now();
  localStorage.setItem(department, JSON.stringify(timestamp));
};
