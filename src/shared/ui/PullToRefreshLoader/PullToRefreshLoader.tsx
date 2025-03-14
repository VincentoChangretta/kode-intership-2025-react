import React from 'react';
import cls from './PullToRefreshLoader.module.scss'; // Импортируем SCSS
import { classNames } from 'shared/lib/classNames/classNames';

interface PullToRefreshLoaderProps {
  className?: string;
  pullDistance: number;
}

export const PullToRefreshLoader: React.FC<PullToRefreshLoaderProps> = ({
  pullDistance,
  className,
}) => {
  const progress = (pullDistance / 80) * 360;
  const rotate = Math.min(360, progress);

  return (
    <div className={cls.loaderSpinner}>
      <div
        className={classNames(cls.spinner, {}, [className])}
        style={{ rotate: `${rotate}deg` }}
      />
    </div>
  );
};
