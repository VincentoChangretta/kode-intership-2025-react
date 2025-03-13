import cls from './Users.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersStateSelector } from '../model/selectors/getUsersValueSelector/getUsersStateSelector';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UserSchema } from '../model/types/userSchema';
import { userFilter } from '../model/lib/userFilter';
import { UsersEmptyList } from './UsersEmptyList/UsersEmptyList';
import { SortTypes, usersActions } from '../model/slices/usersSlice';
import { ListUserCard } from 'shared/ui/ListUserCard/ListUserCard';
import { ListUserCardLoader } from 'shared/ui/ListUserCardLoader/ListUserCardLoader';
import { sortUsersBy } from 'shared/lib/sortBy/sortBy';
import { updateDepartmentUsers } from '../model/actionCreators/UpdateDepartmentUsers';
import { isBirthdayThisYear } from 'shared/lib/isBirthdayThisYear/isBirthdayThisYear';
import { FetchError } from './FetchError/FetchError';

interface UsersProps {
  className?: string;
}

export const Users = (props: UsersProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const allUsersState = useSelector(getUsersStateSelector);
  const [currentDepartmentUsersDataArray, setCurrentDepartmentUsersDataArray] = useState<
    UserSchema[] | null
  >(null);
  const [nextYearUsers, setNextYearUsers] = useState<UserSchema[]>([]);
  const [thisYearUsers, setThisYearUsers] = useState<UserSchema[]>([]);

  const sortBy = allUsersState.sortBy;
  const isLoading = allUsersState.isLoading;
  const searchValue = allUsersState.searchInUsers;

  const hasFetchedData = allUsersState.hasFetched;
  const activeDepartment = allUsersState.activeDepartment;
  const prevDepartmentUsersData = allUsersState.prevDepartmentData;
  const currentDepartmentUsersData = allUsersState.departments[activeDepartment];

  const nextYear = new Date().getFullYear() + 1;
  const previousSortByRef = useRef(sortBy);

  const previousActiveDepartment = useRef(activeDepartment);

  useEffect(() => {
    let sortedArr: UserSchema[] = [];
    if (currentDepartmentUsersData) {
      sortedArr = sortUsersBy(sortBy, sortedArr, currentDepartmentUsersData);
      dispatch(
        usersActions.setUsersByDepartment(updateDepartmentUsers(activeDepartment, sortedArr)),
      );
      setCurrentDepartmentUsersDataArray(sortedArr);
      previousSortByRef.current = sortBy;
    }
  }, [sortBy, activeDepartment]);

  useEffect(() => {
    // Если был очищен поиск, вернем старые данные из useRef
    if (searchValue.length === 0 && currentDepartmentUsersData) {
      if (prevDepartmentUsersData.length > 0) {
        const sortedArr = sortUsersBy(sortBy, [], prevDepartmentUsersData);
        setCurrentDepartmentUsersDataArray(sortedArr);
        dispatch(
          usersActions.setUsersByDepartment(updateDepartmentUsers(activeDepartment, sortedArr)),
        );
      }
    } else if (currentDepartmentUsersData) {
      // здесь мы отталкиваемся от того пуст prevDepartmentUsersData - то есть прошлое сохраненное или нет, чтобы правильно отобразить актуальных пользователей
      let filteredUsers: UserSchema[];
      if (prevDepartmentUsersData.length === 0) {
        filteredUsers = userFilter(searchValue, currentDepartmentUsersData);
      } else {
        filteredUsers = userFilter(searchValue, prevDepartmentUsersData);
      }

      if (
        filteredUsers.length !== currentDepartmentUsersData.length &&
        prevDepartmentUsersData.length === 0
      ) {
        // Если фильтрация изменила данные, обновляем prevDepartmentUsersData
        dispatch(usersActions.setPrevDepartmentData(currentDepartmentUsersData));
      }

      const sortedArr = sortUsersBy(sortBy, [], filteredUsers);
      dispatch(
        usersActions.setUsersByDepartment(updateDepartmentUsers(activeDepartment, sortedArr)),
      );
      setCurrentDepartmentUsersDataArray(sortedArr);
    }
  }, [searchValue, sortBy]);

  // Разделяем пользователей на две группы по дням рождения, если sortBy === SortTypes.byDate
  useEffect(() => {
    if (currentDepartmentUsersData) {
      if (sortBy === SortTypes.byDate) {
        const thisYear = [];
        const nextYear = [];

        currentDepartmentUsersData.forEach((user: UserSchema) => {
          if (isBirthdayThisYear(user.birthday)) {
            thisYear.push(user);
          } else {
            nextYear.push(user);
          }
        });

        setThisYearUsers(thisYear);
        setNextYearUsers(nextYear);
      } else {
        // Если сортировка не по дате, используем старую схему
        setCurrentDepartmentUsersDataArray(currentDepartmentUsersData);
      }
    }
  }, [currentDepartmentUsersData, sortBy, activeDepartment]);

  const setActiveUser = useCallback(
    (user: UserSchema) => {
      dispatch(usersActions.setActiveUser(user));
    },
    [dispatch],
  );

  useEffect(() => {
    if (previousActiveDepartment.current !== activeDepartment) {
      dispatch(usersActions.setSearchInUsers(''));
      previousActiveDepartment.current = activeDepartment;
      dispatch(usersActions.setPrevDepartmentData([]));
    }
  }, [activeDepartment]);

  if (hasFetchedData === false) return <FetchError />;

  if (currentDepartmentUsersDataArray?.length === 0 && !isLoading) {
    return <UsersEmptyList />;
  }

  return (
    <div className={classNames(cls.usersSection, {}, [className])}>
      <ul>
        {isLoading ? (
          <ListUserCardLoader />
        ) : (
          <>
            {sortBy === SortTypes.byDate &&
              nextYearUsers.length > 0 &&
              nextYearUsers.map((user: UserSchema) => (
                <ListUserCard key={user.id} user={user} setActiveUser={setActiveUser} />
              ))}

            {sortBy === SortTypes.byDate && thisYearUsers.length > 0 && (
              <>
                <li className={cls.yearBorder}>
                  <h4 className={cls.year}>{nextYear}</h4>
                </li>
                {thisYearUsers.map((user: UserSchema) => (
                  <ListUserCard key={user.id} user={user} setActiveUser={setActiveUser} />
                ))}
              </>
            )}

            {/* Отображение всех пользователей, если не сортировка по дате */}
            {sortBy !== SortTypes.byDate &&
              currentDepartmentUsersDataArray?.map((user: UserSchema) => (
                <ListUserCard key={user.id} user={user} setActiveUser={setActiveUser} />
              ))}
          </>
        )}
      </ul>
    </div>
  );
};
