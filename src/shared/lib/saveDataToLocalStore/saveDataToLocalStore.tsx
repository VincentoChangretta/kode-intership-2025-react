import { UserSchema } from 'entities/Users';
import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';

export const storedDataName = (department: AllDepartments) => {
  return `data-${department}`;
};

export const saveDataToLocalStorage = (department: AllDepartments, data: UserSchema[]) => {
  localStorage.setItem(storedDataName(department), JSON.stringify(data));
};
