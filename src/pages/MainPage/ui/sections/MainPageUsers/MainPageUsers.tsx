import { Users } from 'entities/Users/ui/Users';
import cls from './MainPageUsers.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface MainPageUsersProps {
  className?: string;
}

const MainPageUsers = (props: MainPageUsersProps) => {
  const { className } = props;

  return (
    <section className={classNames(cls.mainPageUsers, {}, [className])}>
      <Users />
    </section>
  );
};

export default MainPageUsers;
