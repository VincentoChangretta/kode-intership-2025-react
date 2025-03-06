import { magnifyingGlass } from 'shared/assets/images';
import cls from './UsersEmptyList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface UsersEmptyListProps {
  className?: string;
}

export const UsersEmptyList = (props: UsersEmptyListProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.usersEmptyList, {}, [className])}>
      <article className={cls.article}>
        <div className={cls.magnifyingGlassImg}>
          <img className="img" src={magnifyingGlass} alt="magnifying glass" />
        </div>
        <div className={cls.textBox}>
          <h4 className={cls.title}>Мы никого не нашли</h4>
          <p className={cls.text}>Попробуй скорректировать запрос</p>
        </div>
      </article>
    </div>
  );
};
