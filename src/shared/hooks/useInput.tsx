import React, { useState } from 'react';

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    reset,
  };
};
