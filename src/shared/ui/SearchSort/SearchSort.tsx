import { useDispatch, useSelector } from 'react-redux';
import { CloseBtn } from '../CloseBtn/CloseBtn';
import { InputRadio } from '../InputRadio/InputRadio';
import cls from './SearchSort.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { getUsersStateSelector } from 'entities/Users';
import { SortTypes, usersActions } from 'entities/Users/model/slices/usersSlice';
import { useCallback } from 'react';

interface SearchSortProps {
  className?: string;
  modalOnClose: (prev: boolean) => void;
}

const sortVariations = [
  { id: SortTypes.alphabetically, name: 'По алфавиту' },
  { id: SortTypes.byDate, name: 'По дню рождения' },
];

export const SearchSort = (props: SearchSortProps) => {
  const { className, modalOnClose } = props;
  const dispatch = useDispatch();
  const allUsersState = useSelector(getUsersStateSelector);

  const handleChangeSortType = useCallback((sortBy: SortTypes) => {
    dispatch(usersActions.setSortBy(sortBy));
    modalOnClose(false);
  }, []);

  return (
    <article className={classNames(cls.SearchSort, {}, [className])}>
      <div className={cls.titleBox}>
        <h4 className={cls.title}>Сортировка</h4>
        <CloseBtn className={cls.closeBtn} onClose={modalOnClose} />
      </div>
      <div className={cls.inputBox}>
        {sortVariations.map(sortInput => (
          <InputRadio
            key={sortInput.id}
            name="sort"
            checked={allUsersState.sortBy === sortInput.id}
            label={sortInput.name}
            onClick={() => handleChangeSortType(sortInput.id)}
          />
        ))}
      </div>
    </article>
  );
};
