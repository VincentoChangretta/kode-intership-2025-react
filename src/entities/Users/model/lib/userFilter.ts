import { UserSchema } from '../types/userSchema';

export const EMPTY_USERS_LIST = 'empty-users-list';

export const userFilter = (searchValue: string, userArray: UserSchema[]) => {
  if (!searchValue) return userArray;

  const filteredUsers = userArray.filter(user => {
    return (
      user.firstName?.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      user.lastName?.toLowerCase().startsWith(searchValue.toLowerCase()) ||
      user.userTag?.toLowerCase().startsWith(searchValue.toLowerCase())
    );
  });

  if (filteredUsers.length === 0) {
    return EMPTY_USERS_LIST;
  }

  return filteredUsers;
};
