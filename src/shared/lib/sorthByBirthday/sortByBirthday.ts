import { UserSchema } from 'entities/Users';

export const sortByBirthday = (users: UserSchema[]): UserSchema[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...users].sort((a, b) => {
    const dateA = new Date(a.birthday);
    const dateB = new Date(b.birthday);

    const yearA = today.getFullYear();
    const yearB = today.getFullYear();

    dateA.setFullYear(yearA);
    dateB.setFullYear(yearB);

    if (dateA < today) {
      dateA.setFullYear(yearA + 1);
    }
    if (dateB < today) {
      dateB.setFullYear(yearB + 1);
    }

    return dateA.getTime() - dateB.getTime();
  });
};
