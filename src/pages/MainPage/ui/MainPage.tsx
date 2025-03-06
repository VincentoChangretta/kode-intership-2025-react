import { Header } from 'widgets/Header';
import { Suspense } from 'react';
import { MainPageUsersAsync } from './sections/MainPageUsers/MainPageUsers.async';
import { ListUserCardLoader } from 'shared/ui/ListUserCardLoader/ListUserCardLoader';

export const MainPage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Suspense fallback={<ListUserCardLoader />}>
            <MainPageUsersAsync />
          </Suspense>
        </div>
      </main>
    </>
  );
};
