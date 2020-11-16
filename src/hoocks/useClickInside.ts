import { useEffect } from 'react';

type EventType = MouseEvent | TouchEvent;

const useClickInside = (ref: any, callback: () => void): void => {
  const handleClick = (e: EventType) => {
    if (ref?.current?.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};

export default useClickInside;
