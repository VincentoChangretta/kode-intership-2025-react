import { Search } from 'features/Search';
import cls from './Header.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeToggleButton } from 'widgets/ThemeToggleButton/';
import { Navigation } from 'widgets/Navigation';
import { NetworkStatusPreloader } from '../NetworkStatusPreloader/NetworkStatusPreloader';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <header className={classNames(cls.header, {}, [className])}>
      <div className="container">
        <div className={cls.inner}>
          <div className={cls.headerTop}>
            <div className={cls.headerTopInner}>
              <h3 className={cls.title}>{t('Поиск')}</h3>
              <div className={cls.headerUtils}>
                <LangSwitcher />
                <ThemeToggleButton />
              </div>
            </div>
            <Search className={cls.headerSearch} />
            <NetworkStatusPreloader />
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
};
