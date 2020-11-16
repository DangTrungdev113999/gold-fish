/* eslint-disable consistent-return */
import { useRef, useEffect } from 'react';

const useTimeout = <T, D>(callback: T, delay: D): void => {
  const savedCallback = useRef<T | any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(() => savedCallback.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;
