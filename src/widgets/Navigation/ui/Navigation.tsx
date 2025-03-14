import cls from './Navigation.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect, useState, useRef } from 'react';
import { getUsers } from 'entities/Users/api/getUsers/getUsers';
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
import {
  saveTimeToLocalStorage,
  storedTimeName,
} from 'shared/lib/saveTimeToLocalStorage/saveTimeToLocalStorage';
import {
  saveDataToLocalStorage,
  storedDataName,
} from 'shared/lib/saveDataToLocalStore/saveDataToLocalStore';
import { sortUsersBy } from 'shared/lib/sortBy/sortBy';
import { useNetworkStatus } from 'shared/hooks/useNetworkStatus/useNetworkStatus';
import { useTranslation } from 'react-i18next';
import { Dispatch } from '@reduxjs/toolkit';

interface NavigationProps {
  className?: string;
}

export const CACHE_TIME_MINUTE = 5;

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
  const refreshState = allUsersState.refresh;

  const activeDepartmentLink = departmentDetails[activeDepartment.link].link;

  const isOffline = useNetworkStatus();
  const { t } = useTranslation('navigation');

  const fetchUsers = async () => {
    if (hasFetchedRef.current) return;
    dispatch(usersActions.setIsLoading(true));
    let storedData: string | null = localStorage.getItem(storedDataName(activeDepartmentLink));
    const timeNow: number = new Date().getTime();
    const storedDataTime = localStorage.getItem(storedTimeName(activeDepartmentLink));

    if (storedDataTime && (timeNow - Number(storedDataTime)) / 60 / 1000 > CACHE_TIME_MINUTE) {
      // Если прошло больше 5 минут, данные считаются устаревшими
      clearOutdatedData(activeDepartmentLink, hasFetchedRef, dispatch);
      storedData = null; // Явно сбрасываем storedData
    }

    if (!storedData) {
      // Если данные устарели или их нет в localStorage, делаем запрос
      // console.log('Данные отсутствуют в localStorage, запрашиваем с сервера...');
      try {
        const usersData: UserSchema[] | string = await getUsers(activeDepartmentLink);
        // если пришли данные
        let sortedArr: UserSchema[] = [];
        sortedArr = sortUsersBy(sortBy, sortedArr, usersData as UserSchema[]);
        setNewFetchedData(activeDepartmentLink, sortedArr, hasFetchedRef, dispatch);
      } catch (error) {
        // console.error(error);
        dispatch(usersActions.setHasFetched(false));
      }
    } else {
      // Если данные есть в localStorage и они актуальны
      getLocalStoredData(activeDepartmentLink, storedData, hasFetchedData, hasFetchedRef, dispatch);
    }
  };

  useEffect(() => {
    fetchUsers();
    dispatch(usersActions.setActiveDepartmentKey(activeDepartmentLink));
  }, [activeDepartment, dispatch]);

  useEffect(() => {
    hasFetchedRef.current = false;
    if (!isOffline) {
      fetchUsers();
    }
  }, [isOffline]);

  useEffect(() => {
    // отключаем в зависимости от актуальных пользователей currentDepartmentUsersData, чтобы работал условный рендеринг в getUsers
    if (currentDepartmentUsersData.length) {
      dispatch(usersActions.setIsLoading(false));
    }
  }, [currentDepartmentUsersData]);

  useEffect(() => {
    if (refreshState) {
      hasFetchedRef.current = false;
      fetchUsers();
    }
  }, [refreshState]);

  const handleClick = (route: departmentArrTypes) => {
    setActiveDepartment(route);
    hasFetchedRef.current = false; // cбрасываю флаг для вызова функции
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

function clearOutdatedData(
  activeDepartmentLink: AllDepartments,
  hasFetchedRef: { current: boolean },
  dispatch: Dispatch,
) {
  // console.log('Данные устарели - идет очистка кэша...');
  localStorage.removeItem(storedTimeName(activeDepartmentLink));
  localStorage.removeItem(storedDataName(activeDepartmentLink));
  dispatch(usersActions.setUsersByDepartment(updateDepartmentUsers(activeDepartmentLink, [])));
  hasFetchedRef.current = false; // Сбрасываем флаг для нового запроса
}

function setNewFetchedData(
  activeDepartmentLink: AllDepartments,
  sortedArr: UserSchema[],
  hasFetchedRef: { current: boolean },
  dispatch: Dispatch,
) {
  dispatch(usersActions.setHasFetched(true));
  dispatch(
    usersActions.setUsersByDepartment(updateDepartmentUsers(activeDepartmentLink, sortedArr)),
  );
  saveTimeToLocalStorage(activeDepartmentLink);
  saveDataToLocalStorage(activeDepartmentLink, sortedArr);
  hasFetchedRef.current = true; // Данные загружены, флаг в true
}

function getLocalStoredData(
  activeDepartmentLink: AllDepartments,
  storedData: string,
  hasFetchedData: boolean,
  hasFetchedRef: { current: boolean },
  dispatch: Dispatch,
) {
  // console.log('Используются данные из кэша');
  const parsedStoredData = JSON.parse(storedData);
  dispatch(
    usersActions.setUsersByDepartment(
      updateDepartmentUsers(activeDepartmentLink, parsedStoredData),
    ),
  );
  if (!hasFetchedData) {
    dispatch(usersActions.setHasFetched(true));
  }
  hasFetchedRef.current = true; // Данные загружены, флаг в true
}
