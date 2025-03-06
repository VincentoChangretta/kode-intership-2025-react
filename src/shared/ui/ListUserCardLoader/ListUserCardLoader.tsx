import cls from './ListUserCardLoader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ListUserCardLoaderProps {
  className?: string;
  count?: number;
}

export const ListUserCardLoader = ({ className, count = 10 }: ListUserCardLoaderProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className={classNames(cls.listUserCardLoader, {}, [className])}>
          <div className={cls.imgLoader}></div>
          <div>
            <div className={cls.titleLoader}></div>
            <div className={cls.textLoader}></div>
          </div>
        </article>
      ))}
    </>
  );
};
