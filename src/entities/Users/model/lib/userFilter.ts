import { UserSchema } from '../types/userSchema';

export const userFilter = (searchValue: string, userArray: UserSchema[]): UserSchema[] => {
  if (!searchValue) return userArray;

  // Приводим строку поиска к нижнему регистру
  const trimmedSearchValue = searchValue.toLowerCase();

  const filteredUsers = userArray.filter(user => {
    // Приводим имя, фамилию и тег пользователя в нижний регистр
    const firstNameLower = user.firstName?.toLowerCase();
    const lastNameLower = user.lastName?.toLowerCase();
    const userTagLower = user.userTag?.toLowerCase();

    // Проверяем на совпадение с пробелами и без
    return (
      firstNameLower?.startsWith(trimmedSearchValue) ||
      lastNameLower?.startsWith(trimmedSearchValue) ||
      userTagLower?.startsWith(trimmedSearchValue) ||
      // Проверяем слитые имя и фамилию (в том порядке, как они указаны в данных)
      (firstNameLower &&
        lastNameLower &&
        (firstNameLower + ' ' + lastNameLower).startsWith(trimmedSearchValue)) ||
      // Проверяем слитые имя и фамилию в обратном порядке
      (firstNameLower &&
        lastNameLower &&
        (lastNameLower + ' ' + firstNameLower).startsWith(trimmedSearchValue))
    );
  });

  return filteredUsers;
};
