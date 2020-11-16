import { SET_TOKEN } from './constants';

export const setToken = (payload = {}) => {
  return {
    type: SET_TOKEN,
    payload,
  };
};
