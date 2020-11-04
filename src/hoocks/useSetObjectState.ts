import {useCallback, useState} from 'react';

const useSetObjectState = <T extends object>(
  initialValue: T | (() => T),
): [T, (path: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, setState] = useState<T>(initialValue);

  const setMergeState = useCallback(
    (path) => {
      setState((prevState) => ({
        ...prevState,
        ...(path instanceof Function ? path(prevState) : path),
      }));
    },
    [setState],
  );

  return [state, setMergeState];
};

export default useSetObjectState;
