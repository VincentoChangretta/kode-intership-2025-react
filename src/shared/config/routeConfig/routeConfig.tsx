import { MainPage } from 'pages/MainPage';
import { UserPage } from 'pages/UserPage';
import { RouteProps } from 'react-router-dom';

export enum Routes {
  MAIN = 'main',
  USER = 'user',
}

export const RoutePath: Record<Routes, string> = {
  [Routes.MAIN]: '/',
  [Routes.USER]: '/user',
};

export const RouteConfig: Record<Routes, RouteProps> = {
  [Routes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [Routes.USER]: {
    path: RoutePath.user,
    element: <UserPage />,
  },
};
