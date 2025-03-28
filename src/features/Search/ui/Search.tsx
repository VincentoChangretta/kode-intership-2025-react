import { Input, InputVariations } from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersStateSelector, usersActions } from 'entities/Users';
import { Portal } from 'shared/ui/Portal/Portal';
import { Modal } from 'shared/ui/Modal/Modal';
import { SearchSort } from 'shared/ui/SearchSort/SearchSort';
import cls from './Search.module.scss';
import { useTranslation } from 'react-i18next';
import { SortTypes } from 'entities/Users/model/slices/usersSlice';
import {
  MOBILE_MAX_SCREEN_WIDTH,
  useScreenWitdh,
} from 'shared/hooks/useScreenWidth/useScreenWidth';

interface SearchProps {
  className?: string;
}

export const Search = (props: SearchProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const screenWidth = useScreenWitdh();
  const [modalIsActive, setModalIsActive] = useState<boolean>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const allUsersState = useSelector(getUsersStateSelector);
  const sortBy = allUsersState.sortBy;
  const searchValue = allUsersState.searchInUsers;

  const filterUsers = useCallback(
    (searchValue: string) => {
      dispatch(usersActions.setSearchInUsers(searchValue));
    },
    [dispatch],
  );

  const handleOpenModal = useCallback(() => {
    setModalIsActive(true);
  }, []);

  return (
    <div className={classNames(cls.search, {}, [className])}>
      <Input
        variation={InputVariations.SEARCH}
        type="search"
        setIsActive={setIsActive}
        placeholder={t('Введи имя, тег, почту...')}
        searchFilter={filterUsers}
        stateValue={searchValue}
      />
      <svg
        className={classNames(cls.searchIcon, { [cls.active]: isActive || searchValue }, [])}
        width="20"
        height="20"
        viewBox="0 0 21 21"
      >
        <path d="M20.71 19.29L17 15.61C18.4401 13.8144 19.1375 11.5353 18.9488 9.24133C18.7601 6.94733 17.6997 4.81281 15.9855 3.27667C14.2714 1.74053 12.0338 0.919537 9.73292 0.982497C7.43203 1.04546 5.24272 1.98759 3.61514 3.61517C1.98756 5.24275 1.04543 7.43207 0.982466 9.73295C0.919506 12.0338 1.7405 14.2714 3.27664 15.9855C4.81278 17.6997 6.9473 18.7601 9.2413 18.9488C11.5353 19.1375 13.8144 18.4401 15.61 17L19.29 20.68C19.383 20.7738 19.4936 20.8482 19.6154 20.8989C19.7373 20.9497 19.868 20.9758 20 20.9758C20.132 20.9758 20.2627 20.9497 20.3846 20.8989C20.5064 20.8482 20.617 20.7738 20.71 20.68C20.8902 20.4936 20.991 20.2444 20.991 19.985C20.991 19.7257 20.8902 19.4765 20.71 19.29ZM10 17C8.61553 17 7.26215 16.5895 6.111 15.8203C4.95986 15.0511 4.06265 13.9579 3.53284 12.6788C3.00303 11.3997 2.8644 9.99226 3.1345 8.63439C3.4046 7.27653 4.07128 6.02925 5.05025 5.05028C6.02922 4.07131 7.2765 3.40463 8.63436 3.13453C9.99223 2.86443 11.3997 3.00306 12.6788 3.53287C13.9579 4.06268 15.0511 4.95989 15.8203 6.11103C16.5895 7.26218 17 8.61556 17 10C17 11.8565 16.2625 13.637 14.9497 14.9498C13.637 16.2625 11.8565 17 10 17Z" />
      </svg>
      <Button
        className={classNames(cls.sortBtn, {}, [className])}
        theme={ButtonTheme.ICON}
        onClick={handleOpenModal}
      >
        <svg
          className={classNames('', { [cls.sortBtnActive]: sortBy === SortTypes.byDate }, [])}
          width="20.000000"
          height="12.000000"
          viewBox="0 0 20 12"
        >
          <path d="M1 0C0.8 0 0.6 0.05 0.44 0.16C0.27 0.27 0.15 0.43 0.07 0.61C0 0.8 -0.02 1 0.01 1.19C0.05 1.38 0.15 1.56 0.29 1.7C0.43 1.84 0.61 1.94 0.8 1.98C0.99 2.01 1.19 1.99 1.38 1.92C1.56 1.84 1.72 1.71 1.83 1.55C1.94 1.39 2 1.19 2 1C2 0.73 1.89 0.48 1.7 0.29C1.51 0.1 1.26 0 1 0ZM5 2L19 2C19.26 2 19.51 1.89 19.7 1.7C19.89 1.51 20 1.26 20 1C20 0.73 19.89 0.48 19.7 0.29C19.51 0.1 19.26 0 19 0L5 0C4.73 0 4.48 0.1 4.29 0.29C4.1 0.48 4 0.73 4 1C4 1.26 4.1 1.51 4.29 1.7C4.48 1.89 4.73 2 5 2ZM5 5C4.8 5 4.6 5.05 4.44 5.16C4.27 5.27 4.15 5.43 4.07 5.61C4 5.8 3.98 6 4.01 6.19C4.05 6.38 4.15 6.56 4.29 6.7C4.43 6.84 4.61 6.94 4.8 6.98C4.99 7.01 5.19 6.99 5.38 6.92C5.56 6.84 5.72 6.71 5.83 6.55C5.94 6.39 6 6.19 6 6C6 5.73 5.89 5.48 5.7 5.29C5.51 5.1 5.26 5 5 5ZM9 10C8.8 10 8.6 10.05 8.44 10.16C8.27 10.27 8.15 10.43 8.07 10.61C8 10.8 7.98 11 8.01 11.19C8.05 11.38 8.15 11.56 8.29 11.7C8.43 11.84 8.61 11.94 8.8 11.98C8.99 12.01 9.19 11.99 9.38 11.92C9.56 11.84 9.72 11.72 9.83 11.55C9.94 11.39 10 11.19 10 11C10 10.73 9.89 10.48 9.7 10.29C9.51 10.1 9.26 10 9 10ZM19 5L9 5C8.73 5 8.48 5.1 8.29 5.29C8.1 5.48 8 5.73 8 6C8 6.26 8.1 6.51 8.29 6.7C8.48 6.89 8.73 7 9 7L19 7C19.26 7 19.51 6.89 19.7 6.7C19.89 6.51 20 6.26 20 6C20 5.73 19.89 5.48 19.7 5.29C19.51 5.1 19.26 5 19 5ZM19 10L13 10C12.73 10 12.48 10.1 12.29 10.29C12.1 10.48 12 10.73 12 11C12 11.26 12.1 11.51 12.29 11.7C12.48 11.89 12.73 12 13 12L19 12C19.26 12 19.51 11.89 19.7 11.7C19.89 11.51 20 11.26 20 11C20 10.73 19.89 10.48 19.7 10.29C19.51 10.1 19.26 10 19 10Z" />
        </svg>
      </Button>
      <Portal>
        <Modal
          className={classNames(
            cls.modal,
            { [cls.modalForMobile]: screenWidth < MOBILE_MAX_SCREEN_WIDTH },
            [],
          )}
          isActive={modalIsActive}
          onClose={setModalIsActive}
        >
          <SearchSort modalOnClose={setModalIsActive} />
        </Modal>
      </Portal>
    </div>
  );
};
