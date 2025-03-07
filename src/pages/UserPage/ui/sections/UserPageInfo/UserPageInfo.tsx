import { useSelector } from 'react-redux';
import cls from './UserPageInfo.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUsersStateSelector } from 'entities/Users';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { calculateAge } from 'shared/lib/calculateAge/calculateAge';

interface UserPageInfoProps {
  className?: string;
}

export const UserPageInfo = (props: UserPageInfoProps) => {
  const { className } = props;
  const allUsersState = useSelector(getUsersStateSelector);
  const activeUser = allUsersState.activeUser;
  return (
    <section className={classNames(cls.UserPageInfo, {}, [className])}>
      <div className={cls.info}>
        <div className={cls.infoBox}>
          <div className={cls.infoBoxInner}>
            <svg className={cls.icon} viewBox="0 0 20.0272 19.1337">
              <path d="M19.99 7.23C19.93 7.05 19.81 6.89 19.66 6.77C19.51 6.65 19.32 6.58 19.13 6.56L13.44 5.73L10.89 0.56C10.81 0.39 10.68 0.25 10.52 0.15C10.36 0.05 10.18 0 9.99 0C9.8 0 9.62 0.05 9.46 0.15C9.3 0.25 9.17 0.39 9.09 0.56L6.54 5.72L0.85 6.56C0.66 6.59 0.49 6.66 0.35 6.78C0.2 6.9 0.1 7.06 0.04 7.24C-0.01 7.41 -0.02 7.6 0.02 7.77C0.07 7.95 0.16 8.11 0.29 8.24L4.42 12.24L3.42 17.92C3.38 18.11 3.39 18.3 3.46 18.48C3.53 18.66 3.65 18.82 3.8 18.93C3.96 19.05 4.14 19.12 4.34 19.13C4.53 19.14 4.72 19.09 4.89 19L9.99 16.33L15.09 19C15.23 19.08 15.39 19.12 15.55 19.12C15.76 19.12 15.97 19.05 16.14 18.93C16.29 18.82 16.41 18.66 16.48 18.49C16.56 18.31 16.57 18.12 16.54 17.93L15.54 12.25L19.67 8.25C19.81 8.13 19.92 7.97 19.98 7.79C20.03 7.6 20.04 7.41 19.99 7.23ZM13.84 11.23C13.72 11.34 13.64 11.48 13.59 11.63C13.54 11.79 13.52 11.95 13.55 12.11L14.27 16.31L10.51 14.31C10.36 14.24 10.2 14.2 10.04 14.2C9.88 14.2 9.71 14.24 9.57 14.31L5.81 16.31L6.53 12.11C6.55 11.95 6.54 11.79 6.49 11.63C6.44 11.48 6.35 11.34 6.24 11.23L3.24 8.23L7.45 7.62C7.61 7.6 7.76 7.53 7.9 7.44C8.03 7.34 8.14 7.22 8.21 7.07L9.99 3.26L11.87 7.08C11.94 7.23 12.05 7.35 12.18 7.45C12.31 7.54 12.47 7.61 12.63 7.63L16.84 8.24L13.84 11.23Z" />
            </svg>
            <p className={cls.date}>{formatDate(activeUser.birthday)}</p>
          </div>
          <p>{calculateAge(activeUser.birthday)}</p>
        </div>
        <div>
          <div className={cls.infoBoxInner}>
            <svg className={cls.icon} viewBox="0 0 19.9282 19.8704">
              <path d="M17.45 10.96C17.23 10.96 17 10.89 16.78 10.84C16.34 10.74 15.9 10.61 15.47 10.45C15.01 10.28 14.5 10.29 14.04 10.47C13.58 10.65 13.21 11 12.99 11.45L12.77 11.9C11.8 11.35 10.9 10.68 10.11 9.9C9.33 9.1 8.66 8.21 8.11 7.24L8.53 6.96C8.98 6.74 9.32 6.36 9.51 5.91C9.69 5.45 9.7 4.94 9.53 4.48C9.37 4.05 9.24 3.61 9.14 3.17C9.09 2.95 9.05 2.72 9.02 2.49C8.9 1.78 8.53 1.14 7.98 0.69C7.43 0.23 6.74 -0.02 6.02 0L3.02 0C2.59 -0.01 2.17 0.08 1.77 0.26C1.38 0.43 1.03 0.69 0.74 1.01C0.46 1.34 0.25 1.72 0.12 2.13C0 2.54 -0.04 2.98 0.02 3.41C0.56 7.59 2.47 11.49 5.46 14.47C8.45 17.45 12.35 19.35 16.54 19.87L16.92 19.87C17.66 19.87 18.37 19.6 18.92 19.11C19.24 18.82 19.49 18.48 19.66 18.09C19.84 17.7 19.93 17.28 19.92 16.86L19.92 13.86C19.91 13.16 19.66 12.49 19.21 11.96C18.76 11.43 18.14 11.08 17.45 10.96ZM17.95 16.96C17.95 17.1 17.92 17.24 17.86 17.37C17.81 17.5 17.72 17.61 17.61 17.71C17.5 17.8 17.37 17.87 17.23 17.92C17.09 17.96 16.94 17.97 16.79 17.96C13.05 17.48 9.57 15.76 6.91 13.09C4.24 10.41 2.55 6.92 2.08 3.18C2.07 3.03 2.08 2.88 2.12 2.74C2.17 2.6 2.24 2.47 2.33 2.36C2.43 2.25 2.54 2.16 2.67 2.1C2.8 2.05 2.94 2.02 3.08 2.02L6.08 2.02C6.32 2.01 6.54 2.09 6.73 2.23C6.91 2.37 7.03 2.58 7.08 2.81C7.12 3.08 7.17 3.35 7.23 3.62C7.35 4.14 7.5 4.66 7.69 5.17L6.29 5.82C6.17 5.87 6.07 5.95 5.98 6.04C5.89 6.14 5.82 6.25 5.77 6.38C5.73 6.5 5.71 6.63 5.71 6.77C5.72 6.9 5.75 7.03 5.8 7.15C7.24 10.23 9.72 12.71 12.8 14.15C13.05 14.25 13.32 14.25 13.56 14.15C13.69 14.1 13.8 14.03 13.9 13.94C14 13.85 14.08 13.75 14.13 13.63L14.75 12.23C15.27 12.41 15.8 12.56 16.33 12.69C16.6 12.75 16.87 12.8 17.14 12.84C17.37 12.88 17.57 13.01 17.72 13.19C17.86 13.38 17.94 13.6 17.93 13.84L17.95 16.96Z" />
            </svg>

            <a href={`tel:${activeUser.phone}`}>{activeUser.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
};
