import {useRef} from 'react';

type CompareFunction<T> = (prev: T | undefined, next: T) => boolean;

const usePrevies = <T>(
  state: T,
  compare?: CompareFunction<T>,
): T | undefined => {
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  const needUpdate =
    typeof compare === 'function' ? compare(curRef.current, state) : true;

  if (needUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
};

export default usePrevies;
