import { UserSchema } from 'entities/Users';
import cls from './ListUserCard.module.scss';
import { Link } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface ListUserCardProps {
  user: UserSchema;
  className?: string;
  setActiveUser?: (user: UserSchema) => void;
}

export const ListUserCard = (props: ListUserCardProps) => {
  const { user, setActiveUser } = props;
  return (
    <li key={user.id} className={cls.user} onClick={() => setActiveUser(user)}>
      <Link to={RoutePath.user}>
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
      </Link>
    </li>
  );
};
