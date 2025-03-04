import { useEffect, useState } from 'react';
import cls from './Users.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUsers } from '../api/getUsers/getUsers';

interface UsersProps {
  className?: string;
}

interface UserSchema {
  id: string;
  avatarUrl: string;
  birthday: string;
  department: string;
  firstName: string;
  lastName: string;
  phone: string;
  position: string;
  userTag: string;
}

export const Users = ({ className }: UsersProps) => {
  const [users, setUsers] = useState<UserSchema[]>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchUsers(); // Вызываем асинхронную функцию
  }, []);

  console.log(users);

  return (
    <div className={classNames(cls.usersSection, {}, [className])}>
      <ul>
        {users?.map((user, index) => (
          <li key={user.id} className={cls.user}>
            <div className={cls.userInner}>
              <div className={cls.img}>
                <img
                  className="img"
                  src={'https://bstars.ru/media/djcatalog2/images/item/11/andrea-bocelli_f.jpg'}
                  alt={`avatar-${user.firstName}`}
                />
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
