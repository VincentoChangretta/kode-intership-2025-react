import cls from './Navigation.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect, useState, useRef } from 'react';
import { FETCH_ERROR, getUsers } from 'entities/Users/api/getUsers/getUsers';
import { useDispatch, useSelector } from 'react-redux';
import { usersActions } from 'entities/Users/model/slices/usersSlice';
import { UserSchema } from 'entities/Users/model/types/userSchema';
import { updateDepartmentUsers } from 'entities/Users/model/actionCreators/UpdateDepartmentUsers';
import {
  AllDepartments,
  departmentArr,
  departmentArrTypes,
  departmentDetails,
} from 'shared/config/navDepartmentConfig/navDepartmentConfig';
import { getUsersStateSelector } from 'entities/Users';
import { getStoredCacheTime } from 'shared/lib/getStorageCacheTime/getStorageCacheTime';
import { saveTimeToLocalStorage } from 'shared/lib/saveTimeToLocalStorage/saveTimeToLocalStorage';
import { saveDataToLocalStorage } from 'shared/lib/saveDataToLocalStore/saveDataToLocalStore';
import { sortUsersBy } from 'shared/lib/sortBy/sortBy';
import { useNetworkStatus } from 'shared/hooks/useNetworkStatus';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  className?: string;
}

export const Navigation = (props: NavigationProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const allUsersState = useSelector(getUsersStateSelector);
  const sortBy = allUsersState.sortBy;
  const hasFetchedRef = useRef<boolean>(false); // Флаг, чтобы избежать повторной загрузки данных
  const [activeDepartment, setActiveDepartment] = useState<departmentArrTypes>(
    departmentDetails[allUsersState.activeDepartment] || departmentArr[0],
  );
  const currentDepartmentUsersData = allUsersState.departments[activeDepartment.link];
  const hasFetchedData = allUsersState.hasFetched;

  const isOffline = useNetworkStatus();
  const { t } = useTranslation('navigation');

  const fetchUsers = async () => {
    if (hasFetchedRef.current) return;
    dispatch(usersActions.setIsLoading(true));

    let storedData = localStorage.getItem(`data-${activeDepartment.link}`);
    const timeNow: number = new Date().getTime();
    const storedDataTime = localStorage.getItem(activeDepartment.link);

    // Проверка времени кеширования
    if (storedDataTime && (timeNow - Number(storedDataTime)) / 60 / 1000 > 5) {
      // Если прошло больше 5 минут, данные считаются устаревшими
      console.log('Данные устарели - идет очистка кэша...');
      localStorage.removeItem(activeDepartment.link);
      localStorage.removeItem(`data-${activeDepartment.link}`);
      storedData = null; // Явно сбрасываем storedData
      dispatch(
        usersActions.setUsersByDepartment(
          updateDepartmentUsers(departmentDetails[activeDepartment.link].link, []),
        ),
      );
      hasFetchedRef.current = false; // Сбрасываем флаг для нового запроса
    }

    // Если данные устарели или их нет в localStorage, делаем запрос
    if (!storedData) {
      console.log('Данные отсутствуют в localStorage, запрашиваем с сервера...');
      try {
        const usersData: UserSchema[] | string = await getUsers(
          activeDepartment.link,
          currentDepartmentUsersData,
          activeDepartment,
        );
        if (usersData === FETCH_ERROR) {
          dispatch(usersActions.setHasFetched(false));
        } else {
          let sortedArr: UserSchema[] = [];
          sortedArr = sortUsersBy(sortBy, sortedArr, usersData as UserSchema[]);
          dispatch(usersActions.setHasFetched(true));
          dispatch(
            usersActions.setUsersByDepartment(
              updateDepartmentUsers(departmentDetails[activeDepartment.link].link, sortedArr),
            ),
          );

          // Сохраняем новые данные в localStorage
          saveTimeToLocalStorage(activeDepartment.link as AllDepartments);
          saveDataToLocalStorage(activeDepartment.link, sortedArr);
          hasFetchedRef.current = true; // Данные загружены, теперь флаг в true
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Если данные есть в localStorage и они актуальны
      console.log('Используются данные из кэша');
      const parsedStoredData = JSON.parse(storedData);
      dispatch(
        usersActions.setUsersByDepartment(
          updateDepartmentUsers(departmentDetails[activeDepartment.link].link, parsedStoredData),
        ),
      );
      if (!hasFetchedData) {
        dispatch(usersActions.setHasFetched(true));
      }
      hasFetchedRef.current = true; // Данные загружены, теперь флаг в true
    }
  };

  useEffect(() => {
    fetchUsers();
    dispatch(usersActions.setActiveDepartmentKey(departmentDetails[activeDepartment.link].link));
  }, [activeDepartment, dispatch, allUsersState.departments]);

  useEffect(() => {
    hasFetchedRef.current = false;
    if (!isOffline) {
      fetchUsers();
    }
  }, [isOffline]);

  useEffect(() => {
    // отключаем в зависимости от актуальных пользователей, чтобы работал условный рендеринг в getUsers
    if (currentDepartmentUsersData.length) {
      dispatch(usersActions.setIsLoading(false));
    }
  }, [currentDepartmentUsersData]);

  const handleClick = (route: departmentArrTypes) => {
    setActiveDepartment(route);
    hasFetchedRef.current = false;
  };

  return (
    <nav className={classNames(cls.navigation, {}, [className])}>
      <ul className={classNames(cls.navigationList, {}, [])}>
        {departmentArr.map(route => (
          <li
            key={route?.name}
            className={classNames(
              cls.navigationListItem,
              { [cls.active]: route?.name === activeDepartment.name },
              [],
            )}
            onClick={() => handleClick(route)}
          >
            {t(route?.name)}
          </li>
        ))}
      </ul>
    </nav>
  );
};
