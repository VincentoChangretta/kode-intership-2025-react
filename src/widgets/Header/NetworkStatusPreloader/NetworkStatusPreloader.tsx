import { useEffect, useState } from 'react';
import cls from './NetworkStatusPreloader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useNetworkStatus } from 'shared/hooks/useNetworkStatus/useNetworkStatus';
import { useTranslation } from 'react-i18next';
import { useScreenWitdh } from 'shared/hooks/useScreenWidth/useScreenWidth';
import { Portal } from 'shared/ui/Portal/Portal';

interface OfflinePreloaderProps {
  className?: string;
  setIsOffline?: (prev: boolean) => void;
}

export const NetworkStatusPreloader = (props: OfflinePreloaderProps) => {
  const { className, setIsOffline } = props;
  const { t } = useTranslation();
  const isOffline = useNetworkStatus();
  const screenWidth = useScreenWitdh();
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
      {screenWidth > 1024 ? (
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
      ) : (
        <Portal>
          <div className="container">
            <div className={classNames(cls.offlinePreloaderForMobile, {}, [className])}>
              <div className={classNames(cls.innerForMobile, Mods, [])}>
                {isOffline ? (
                  <p>{t('Не могу обновить данные. Проверь соединение с интернетом.')}</p>
                ) : wasOffline ? (
                  <p>{t('Секундочку, гружусь...')}</p>
                ) : null}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
