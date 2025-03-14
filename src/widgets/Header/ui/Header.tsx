import { Search } from 'features/Search';
import cls from './Header.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeToggleButton } from 'widgets/ThemeToggleButton/';
import { Navigation } from 'widgets/Navigation';
import { NetworkStatusPreloader } from '../NetworkStatusPreloader/NetworkStatusPreloader';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface HeaderProps {
  className?: string;
}

export const Header = (props: HeaderProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const [isOffline, setIsOffline] = useState<boolean>();

  return (
    <header className={classNames(cls.header, {}, [className])}>
      <div className="container">
        <div className={cls.inner}>
          <div className={cls.headerTop}>
            <div className={cls.headerTopInner}>
              <h3 className={classNames(cls.title, { [cls.errorTitle]: isOffline }, [])}>
                {t('Поиск')}
              </h3>
              <div className={cls.headerUtils}>
                <LangSwitcher />
                <ThemeToggleButton />
              </div>
            </div>
            <Search className={cls.headerSearch} />
            <NetworkStatusPreloader setIsOffline={setIsOffline} />
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  );
};
