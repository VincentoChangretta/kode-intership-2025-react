import { getUsersStateSelector } from 'entities/Users';
import { useSelector } from 'react-redux';

export const useFindActiveUser = (): boolean => {
  const allUsersState = useSelector(getUsersStateSelector);
  const activeUser = allUsersState.activeUser;
  if (!activeUser) return null;
  return true;
};
