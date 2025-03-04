import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { RouteConfig } from 'shared/config/routeConfig/routeConfig';

export const AppRouter = () => {
  return (
    <Routes>
      {Object.values(RouteConfig).map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<Suspense fallback="...loading">{element}</Suspense>}
        />
      ))}
    </Routes>
  );
};
