import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useFindActiveUser } from 'shared/hooks/useFindActiveUser';
import { UserHeader } from 'widgets/UserHeader';
import { UserPageInfo } from './sections/UserPageInfo/UserPageInfo';

export const UserPage = () => {
  const isExistActiveUser = useFindActiveUser();

  if (!isExistActiveUser) {
    window.location.href = RoutePath.main;
    return null;
  }

  return (
    <>
      <UserHeader />
      <main className="main">
        <div className="container">
          <UserPageInfo />
        </div>
      </main>
    </>
  );
};
