import { UserSchema } from 'entities/Users';

export const sortByBirthday = (users: UserSchema[]): UserSchema[] => {
  const today = new Date();

  return [...users].sort((a, b) => {
    const dateA = new Date(a.birthday);
    const dateB = new Date(b.birthday);

    const yearA = today.getFullYear();
    const yearB = today.getFullYear();

    dateA.setFullYear(yearA);
    dateB.setFullYear(yearB);

    // Если день рождения пользователя еще не наступил в этом году, настраиваем дату на следующий год
    if (dateA < today) {
      dateA.setFullYear(yearA + 1);
    }
    if (dateB < today) {
      dateB.setFullYear(yearB + 1);
    }

    //Считаем разницу
    const diffA = dateA.getTime() - today.getTime();
    const diffB = dateB.getTime() - today.getTime();

    return diffA - diffB;
  });
};
