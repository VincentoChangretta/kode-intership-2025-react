import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './ErrorPage.module.scss';
import { useCallback } from 'react';

export const ErrorPage = () => {
  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <section className={cls.errorPage}>
      <div className={cls.inner}>
        <h2>Произошла непредвиденная ошибка</h2>
        <Button theme={ButtonTheme.FULL_RADIUS} onClick={handleReload}>
          Перезагрузить
        </Button>
      </div>
    </section>
  );
};
