import { UserSchema } from 'entities/Users';

export const sortByBirthday = (users: UserSchema[]): UserSchema[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня

  return [...users].sort((a, b) => {
    const dateA = new Date(a.birthday);
    const dateB = new Date(b.birthday);

    // Устанавливаем текущий год для сравнения
    const yearA = today.getFullYear();
    const yearB = today.getFullYear();

    dateA.setFullYear(yearA);
    dateB.setFullYear(yearB);

    // Если день рождения уже прошел в этом году, устанавливаем следующий год
    if (dateA < today) {
      dateA.setFullYear(yearA + 1);
    }
    if (dateB < today) {
      dateB.setFullYear(yearB + 1);
    }

    // Сравниваем даты
    return dateA.getTime() - dateB.getTime();
  });
};
