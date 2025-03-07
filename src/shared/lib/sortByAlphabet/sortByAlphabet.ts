import { UserSchema } from 'entities/Users';

export const sortByAlphabet = (users: UserSchema[]): UserSchema[] => {
  return [...users].sort((a, b) => {
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
    return 0;
  });
};
