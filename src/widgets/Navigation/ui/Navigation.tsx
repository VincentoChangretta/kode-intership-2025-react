import cls from './Navigation.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect, useState } from 'react';
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
import { getUsersStateSelector } from 'entities/Users/model/selectors/getUsersValueSelector/getUsersStateSelector';

interface NavigationProps {
  className?: string;
}

export const Navigation = (props: NavigationProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const [activeDepartment, setActiveDepartment] = useState<departmentArrTypes>(departmentArr[0]);
  const activeDepartmentState = useSelector(getUsersStateSelector);

  console.log(departmentDetails[activeDepartment.link]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData: UserSchema[] = await getUsers(activeDepartment.link);
        if (activeDepartment.link === departmentDetails.all.link) {
          dispatch(usersActions.setUsers(usersData));
        } else {
          console.log('new');
          dispatch(
            usersActions.setUsersByDepartment(
              updateDepartmentUsers(departmentDetails[activeDepartment.link].link, usersData),
            ),
          );
        }
        dispatch(
          usersActions.setActiveDepartmentKey(departmentDetails[activeDepartment.link].link),
        );
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchUsers();
  }, [activeDepartment, dispatch]);

  const handleClick = (route: departmentArrTypes) => {
    setActiveDepartment(route);
  };

  return (
    <nav className={classNames(cls.navigation, {}, [className])}>
      <ul className={classNames(cls.navigationList, {}, [])}>
        {departmentArr.map(route => (
          <li
            key={route.name}
            className={classNames(
              cls.navigationListItem,
              { [cls.active]: route.name === activeDepartment.name },
              [],
            )}
            onClick={() => handleClick(route)}
          >
            {route.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};
