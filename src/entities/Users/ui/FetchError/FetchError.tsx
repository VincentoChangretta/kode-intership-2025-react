import { ufoImg } from 'shared/assets/images';
import cls from './FetchError.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface FetchErrorProps {
  className?: string;
}

export const FetchError = (props: FetchErrorProps) => {
  const { className } = props;
  return (
    <div className={classNames(cls.fetchError, {}, [className])}>
      <article className={cls.article}>
        <div className={cls.ufoImg}>
          <img className="img" src={ufoImg} alt="magnifying glass" />
        </div>
        <div className={cls.textBox}>
          <h4 className={cls.title}>Какой-то сверхразум все сломал</h4>
          <p className={cls.text}>Постараемся быстро починить</p>
          <button className={cls.try} onClick={() => window.location.reload()}>
            Попробовать снова
          </button>
        </div>
      </article>
    </div>
  );
};
