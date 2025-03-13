import { useInput } from 'shared/hooks/useInput';
import cls from './Input.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes, useCallback, useEffect } from 'react';
import { Button, ButtonTheme } from '../Button/Button';

export enum InputVariations {
  STANDART = 'standart',
  SEARCH = 'search',
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  boxClassName?: string;
  classname?: string;
  stateValue?: string;
  variation: InputVariations;
  setIsActive?: (prev: boolean) => void;
  searchFilter?: (searchValue: string) => void;
}

export const Input = (props: InputProps) => {
  const {
    boxClassName,
    className,
    variation,
    type,
    setIsActive,
    searchFilter,
    stateValue,
    ...otherProps
  } = props;
  const { value, onChange, reset } = useInput();

  useEffect(() => {
    value ? setIsActive(true) : setIsActive(false);
  }, [value, setIsActive]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, resetFunc?: () => void) => {
      if (resetFunc) {
        resetFunc();
      }
      const currentValue = e.target.value;
      onChange(e);
      if (searchFilter) {
        searchFilter(currentValue);
      }
    },
    [onChange, searchFilter],
  );

  const handeResetSearch = useCallback(() => {
    reset();
    if (searchFilter) {
      searchFilter('');
    }
  }, [reset, searchFilter]);

  const inputType = type === '' ? 'text' : type;
  const inputMods: Record<string, boolean | string> = {
    [cls[variation]]: true,
  };
  const searchBtnMods: Record<string, boolean | string> = {
    [cls.activeBtn]: variation === InputVariations.SEARCH && stateValue,
  };

  return (
    <div className={classNames(cls.inputBox, {}, [boxClassName])}>
      <input
        type={inputType}
        value={stateValue}
        onChange={handleOnChange}
        className={classNames(cls.input, inputMods, [className])}
        {...otherProps}
      />
      {variation === InputVariations.SEARCH && (
        <Button
          className={classNames(cls.searchBtn, searchBtnMods, [])}
          theme={ButtonTheme.ICON}
          onClick={handeResetSearch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </Button>
      )}
    </div>
  );
};
