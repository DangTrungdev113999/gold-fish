/* eslint-disable no-console */
import { useCallback, useRef, useState } from 'react';

const useDynamicList = <T>(initialValue: T[]) => {
  const counterRef = useRef(-1);
  // lưu trữ key
  const keyList = useRef<number[]>([]);

  // phướng thức nội bộ
  const setKey = useCallback((index: number) => {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  const [list, setList] = useState(() => {
    (initialValue || []).forEach((_, index) => {
      setKey(index);
    });

    return initialValue || [];
  });

  const getkey = (index: number) => keyList.current[index];
  const getIndex = (index: number) =>
    keyList.current.findIndex((ele) => ele === index);

  const resetList = (newList: T[] = []) => {
    keyList.current = [];
    counterRef.current = -1;
    setList(() => {
      (newList || []).forEach((_, index) => {
        setKey(index);
      });
      return newList || [];
    });
  };

  const insert = (index: number, obj: T) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 0, obj);
      setKey(index);
      return temp;
    });
  };

  const merge = (index: number, arr: T[]) => {
    setList((l) => {
      const temp = [...l];
      arr.forEach((_, i) => {
        setKey(index + i);
      });
      temp.splice(index, 0, ...arr);
      return temp;
    });
  };

  const replace = (index: number, obj: T) => {
    setList((l) => {
      const temp = [...l];
      temp[index] = obj;
      return temp;
    });
  };

  const remove = (index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);
      // remove keys if necessary
      try {
        keyList.current.splice(index, 1);
      } catch (e) {
        console.error(e);
      }
      return temp;
    });
  };

  const push = (obj: T) => {
    setList((l) => {
      setKey(l.length);
      return l.concat([obj]);
    });
  };

  const pop = () => {};
  const unshift = () => {};
  const shift = () => {};

  return {
    list,
    resetList,
    insert,
    merge,
    replace,
    remove,
    push,
    pop,
    unshift,
    shift,
    getkey,
    getIndex,
  };
};

export default useDynamicList;
