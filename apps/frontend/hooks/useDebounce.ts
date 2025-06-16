import { useEffect, useRef, useState } from 'react';

const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState('');
  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
