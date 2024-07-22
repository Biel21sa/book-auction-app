'use client';

import { useState } from 'react';

const useLocalStorage = (key: string) => {
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {}
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      setState(value);
    } catch (error) {}
  };

  return [state, setValue];
};

export default useLocalStorage;
