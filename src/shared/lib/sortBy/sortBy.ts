import { SortTypes } from 'entities/Users/model/slices/usersSlice';
import { sortByAlphabet } from '../sortByAlphabet/sortByAlphabet';
import { sortByBirthday } from '../sorthByBirthday/sortByBirthday';
import { UserSchema } from 'entities/Users';

export const sortUsersBy = (
  sortBy: SortTypes,
  sortedArrLink: UserSchema[],
  currentDepartamentUsers: UserSchema[],
): UserSchema[] => {
  switch (sortBy) {
    case SortTypes.alphabetically:
      sortedArrLink = sortByAlphabet(currentDepartamentUsers);
      break;
    case SortTypes.byDate:
      sortedArrLink = sortByBirthday(currentDepartamentUsers);
      break;
    default:
      return currentDepartamentUsers;
  }

  return sortedArrLink;
};
