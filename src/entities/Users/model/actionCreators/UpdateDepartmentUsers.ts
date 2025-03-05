import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';
import { UserSchema } from '../types/userSchema';

export const updateDepartmentUsers = (department: AllDepartments, users: UserSchema[]) => {
  return { department, users };
};
