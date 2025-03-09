import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';

export const getStoredCacheTime = (department: AllDepartments): boolean => {
  const storedTime = localStorage.getItem(department);
  if (!storedTime) return true;
  const parsedTime = JSON.parse(storedTime);
  const timeDifference = Date.now() - parsedTime;
  return timeDifference > 5 * 60 * 1000;
};
