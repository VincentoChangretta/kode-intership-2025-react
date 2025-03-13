import { useEffect, useState } from 'react';
import cls from './NetworkStatusPreloader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useNetworkStatus } from 'shared/hooks/useNetworkStatus';
import { useTranslation } from 'react-i18next';

interface OfflinePreloaderProps {
  className?: string;
  setIsOffline?: (prev: boolean) => void;
}

export const NetworkStatusPreloader = (props: OfflinePreloaderProps) => {
  const { className, setIsOffline } = props;
  const { t } = useTranslation();

  const isOffline = useNetworkStatus();
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setWasOffline(true);
      setIsOffline(true);
    } else if (wasOffline) {
      const timer = setTimeout(() => (setWasOffline(false), setIsOffline(false)), 1500); // для плавной анимациии ставим задержку
      return () => clearTimeout(timer);
    }
  }, [isOffline, wasOffline]);

  const Mods: Record<string, boolean | string> = {
    [cls.offline]: isOffline,
    [cls.online]: wasOffline,
  };

  return (
    <>
      <div className={classNames(cls.offlinePreloader, Mods, [className])}></div>
      <div className={classNames(cls.inner)}>
        {isOffline ? (
          <p>{t('Не могу обновить данные. Проверь соединение с интернетом.')}</p>
        ) : wasOffline ? (
          <p>{t('Секундочку, гружусь...')}</p>
        ) : null}
      </div>
    </>
  );
};
