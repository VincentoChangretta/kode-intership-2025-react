import React, { InputHTMLAttributes } from 'react';
import { useInput } from 'shared/hooks/useInput/useInput';
import cls from './InputRadio.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface InputRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  classname?: string;
  label: string;
  name: string;
}

export const InputRadio = (props: InputRadioProps) => {
  const { className, label, name, ...otherProps } = props;
  const { value, onChange } = useInput<string>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <label className={classNames(cls.radioWrapper, {}, [className])}>
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleOnChange}
        className={cls.inputRadio}
        {...otherProps}
      />
      <span className={cls.radioCustom}></span>{' '}
      {label && <span className={cls.label}>{label}</span>}
    </label>
  );
};
