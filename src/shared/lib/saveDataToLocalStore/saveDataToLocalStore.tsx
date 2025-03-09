import { UserSchema } from 'entities/Users';

export const saveDataToLocalStorage = (key: string, data: UserSchema[]) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(`data-${key}`, serializedData);
  } catch (error) {
    throw new Error(error);
  }
};
