import cls from './Navigation.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';

interface NavigationProps {
  className?: string;
}

const navigationArr = [
  {
    name: 'Все',
    link: '123',
  },
  {
    name: 'Android',
    link: '123',
  },
  {
    name: 'iOS',
    link: '123',
  },
  {
    name: 'Дизайн',
    link: '123',
  },
  {
    name: 'Менеджмент',
    link: '123',
  },
  {
    name: 'QA',
    link: '123',
  },
  {
    name: 'Бэк-офис',
    link: '123',
  },
  {
    name: 'Frontend',
    link: '123',
  },
  {
    name: 'HR',
    link: '123',
  },
  {
    name: 'PR',
    link: '123',
  },
  {
    name: 'Backend',
    link: '123',
  },
  {
    name: 'Техподдержка',
    link: '123',
  },
  {
    name: 'Аналитика',
    link: '123',
  },
];

export const Navigation = (props: NavigationProps) => {
  const { className } = props;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <nav className={classNames(cls.navigation, {}, [className])}>
      <ul className={classNames(cls.navigationList, {}, [])}>
        {navigationArr.map((route, index) => (
          <li
            key={route.name + index}
            className={classNames(
              cls.navigationListItem,
              { [cls.active]: index === activeIndex },
              [],
            )}
            onClick={() => handleClick(index)}
          >
            {route.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};
