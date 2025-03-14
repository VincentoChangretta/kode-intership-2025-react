import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { UserHeader } from 'widgets/UserHeader';
import { UserPageInfo } from './sections/UserPageInfo/UserPageInfo';
import { useSelector } from 'react-redux';
import { getUsersStateSelector } from 'entities/Users';

export const UserPage = () => {
  const isExistActiveUser = useSelector(getUsersStateSelector).activeUser;

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
