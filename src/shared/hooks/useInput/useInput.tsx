import React, { useState } from 'react';

export const useInput = <T = string,>(initialValue: T = '' as T) => {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T);
  };

  const reset = () => {
    setValue('' as T);
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    reset,
  };
};
