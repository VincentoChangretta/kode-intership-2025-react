import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './UserHeader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUsersStateSelector } from 'entities/Users';
import { useNavigate } from 'react-router-dom';

interface UserHeaderProps {
  className?: string;
}

export const UserHeader = (props: UserHeaderProps) => {
  const { className } = props;
  const allUsersState = useSelector(getUsersStateSelector);
  const activeUser = allUsersState.activeUser;
  const navigate = useNavigate();

  const handleToBack = () => {
    navigate(-1);
  };

  return (
    <header className={classNames(cls.userHeader, {}, [className])}>
      <div className="container">
        <div className={cls.inner}>
          <Button className={cls.toBack} theme={ButtonTheme.ICON} onClick={handleToBack}>
            <svg width="6.246582" height="10.485840" viewBox="0 0 6.24658 10.4858">
              <path d="M0.29 5.95L4.53 10.19C4.62 10.28 4.73 10.35 4.86 10.4C4.98 10.45 5.11 10.48 5.24 10.48C5.37 10.48 5.5 10.45 5.63 10.4C5.75 10.35 5.86 10.28 5.95 10.19C6.14 10 6.24 9.74 6.24 9.48C6.24 9.22 6.14 8.96 5.95 8.78L2.41 5.23L5.95 1.7C6.14 1.51 6.24 1.25 6.24 0.99C6.24 0.73 6.14 0.47 5.95 0.29C5.86 0.19 5.75 0.12 5.62 0.07C5.5 0.02 5.37 -0.01 5.24 0C5.11 -0.01 4.98 0.02 4.86 0.07C4.73 0.12 4.62 0.19 4.53 0.29L0.29 4.53C0.2 4.62 0.12 4.73 0.07 4.85C0.02 4.97 0 5.1 0 5.23C0 5.37 0.02 5.5 0.07 5.62C0.12 5.74 0.2 5.85 0.29 5.95Z" />
            </svg>
          </Button>
          <article>
            <div className={cls.userAvatar}>
              <img
                className="img"
                src={activeUser.avatarUrl}
                alt={`${activeUser.firstName}-avatar`}
              />
            </div>
            <div className={cls.textBox}>
              <h2 className={cls.title}>
                {`${activeUser.firstName}  ${activeUser.lastName}`}{' '}
                <span className={cls.userTag}>{activeUser.userTag}</span>
              </h2>
              <p className={cls.userPosition}>{activeUser.position}</p>
            </div>
          </article>
        </div>
      </div>
    </header>
  );
};
