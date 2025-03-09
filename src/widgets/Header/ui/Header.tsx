import { Search } from 'features/Search';
import cls from './Header.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeToggleButton } from 'shared/ui/ThemeToggleButton/ThemeToggleButton';
import { Navigation } from 'widgets/Navigation';
interface HeaderProps {
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { className } = props;

  return (
    <header className={classNames(cls.header, {}, [className])}>
      <div className="container">
        <div className={cls.inner}>
          <div className={cls.headerTop}>
            <h3 className={cls.title}>Поиск</h3>
            <ThemeToggleButton />
          </div>
          <Search className={cls.headerSearch} />
          <Navigation />
        </div>
      </div>
    </header>
  );
};
