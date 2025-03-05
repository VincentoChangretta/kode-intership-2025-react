import cls from './Users.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUsersStateSelector } from '../model/selectors/getUsersValueSelector/getUsersStateSelector';

interface UsersProps {
  className?: string;
}

export const Users = (props: UsersProps) => {
  const { className } = props;
  const allUsersState = useSelector(getUsersStateSelector);

  // console.log(allUsersState);

  const activeDepartment = allUsersState.activeDepartment;

  // console.log(allUsersState.departments);
  // console.log(allUsersState.departments[activeDepartment]);

  return (
    <div className={classNames(cls.usersSection, {}, [className])}>
      <ul>
        {allUsersState.departments[activeDepartment]?.map(user => (
          <li key={user.id} className={cls.user}>
            <div className={cls.userInner}>
              <div className={cls.img}>
                <img className="img" src={user.avatarUrl} alt={`avatar-${user.firstName}`} />
              </div>
              <div>
                <h4 className={cls.userTitle}>
                  {' '}
                  {`${user.firstName} ${user.lastName}`}{' '}
                  <span className={cls.userTag}>{user.userTag}</span>
                </h4>
                <p className={cls.userPosition}>{user.position}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
