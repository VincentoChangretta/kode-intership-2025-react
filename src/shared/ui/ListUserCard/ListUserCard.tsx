import { UserSchema } from 'entities/Users';
import cls from './ListUserCard.module.scss';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { userIcon } from 'shared/assets/images';
import { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface ListUserCardProps {
  user: UserSchema;
  className?: string;
  setActiveUser?: (user: UserSchema) => void;
}

export const ListUserCard = (props: ListUserCardProps) => {
  const { user, setActiveUser } = props;
  const [avatarNotFound, setAvatarNotFound] = useState<boolean>(false);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = '';
    setAvatarNotFound(true);
  };

  return (
    <li key={user.id} className={cls.user} onClick={() => setActiveUser(user)}>
      <Link to={RoutePath.user}>
        <div className={cls.userInner}>
          <div className={cls.img}>
            <img
              src={user.avatarUrl}
              alt={`avatar-${user.firstName}`}
              onError={handleImageError}
              style={avatarNotFound ? { display: 'none' } : {}}
            />
            {avatarNotFound && (
              <div
                className={classNames('img', { [cls.avatarNotFound]: avatarNotFound })}
                style={{ backgroundImage: `url(${userIcon})` }}
              />
            )}
          </div>
          <div>
            <h4 className={cls.userTitle}>
              {`${user.firstName} ${user.lastName}`}
              <span className={cls.userTag}>{user.userTag}</span>
            </h4>
            <p className={cls.userPosition}>{user.position}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
