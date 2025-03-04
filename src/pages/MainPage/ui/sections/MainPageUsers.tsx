import { Users } from 'entities/Users/ui/Users';
import cls from './MainPageUsers.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface MainPageUsersProps {
  className?: string;
}

export const MainPageUsers = (props: MainPageUsersProps) => {
  const { className } = props;
  return (
    <section className={classNames(cls.MainPageUsers, {}, [className])}>
      <Users />
    </section>
  );
};
