import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ErrorPage.module.scss';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const ErrorPage = () => {
  const { t } = useTranslation();

  const handleReload = useCallback(() => {
    window.location.href = '/';
  }, []);

  return (
    <section className={cls.errorPage}>
      <div className={cls.inner}>
        <h2 className={cls.errorText}>{t('Непредвиденная ошибка')}</h2>
        <Button theme={ButtonTheme.FULL_RADIUS} onClick={handleReload}>
          {t('Перезагрузить')}
        </Button>
      </div>
    </section>
  );
};
