import cls from './Users.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersStateSelector } from '../model/selectors/getUsersValueSelector/getUsersStateSelector';
import { useCallback, useEffect, useState } from 'react';
import { UserSchema } from '../model/types/userSchema';
import { EMPTY_USERS_LIST, userFilter } from '../model/lib/userFilter';
import { UsersEmptyList } from './UsersEmptyList/UsersEmptyList';
import { SortTypes, usersActions } from '../model/slices/usersSlice';
import { ListUserCard } from 'shared/ui/ListUserCard/ListUserCard';
import { ListUserCardLoader } from 'shared/ui/ListUserCardLoader/ListUserCardLoader';
import { sortByAlphabet } from 'shared/lib/sortByAlphabet/sortByAlphabet';
import { sortByBirthday } from 'shared/lib/sorthByBirthday/sortByBirthday';

interface UsersProps {
  className?: string;
}

export const Users = (props: UsersProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const [currentDepartmentArray, setCurrentDepartmentArray] = useState(null);
  const allUsersState = useSelector(getUsersStateSelector);

  const sortby = allUsersState.sortBy;
  const isLoading = allUsersState.isLoading;
  const searchValue = allUsersState.searchInUsers;
  const activeDepartment = allUsersState.activeDepartment;
  const currentDepartment = allUsersState.departments[activeDepartment];

  useEffect(() => {
    let sortedArr: UserSchema[];
    if (currentDepartment) {
      switch (sortby) {
        case SortTypes.alphabetically:
          sortedArr = sortByAlphabet(currentDepartment);
          break;
        case SortTypes.byDate:
          sortedArr = sortByBirthday(currentDepartment);
          break;
        default:
          return null;
      }
    }
    setCurrentDepartmentArray(sortedArr);
  }, [currentDepartment, sortby]);

  useEffect(() => {
    const filteredUsers = userFilter(searchValue, currentDepartment);
    setCurrentDepartmentArray(filteredUsers);
  }, [searchValue]);

  const setActiveUser = useCallback(
    (user: UserSchema) => {
      dispatch(usersActions.setActiveUser(user));
    },
    [dispatch],
  );

  if (currentDepartmentArray === EMPTY_USERS_LIST) return <UsersEmptyList />;

  return (
    <div className={classNames(cls.usersSection, {}, [className])}>
      <ul>
        {isLoading ? (
          <ListUserCardLoader />
        ) : (
          currentDepartmentArray?.map((user: UserSchema) => (
            <ListUserCard key={user.id} user={user} setActiveUser={setActiveUser} />
          ))
        )}
      </ul>
    </div>
  );
};
