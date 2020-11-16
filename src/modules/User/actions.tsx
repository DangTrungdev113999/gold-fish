import { SAVE_PHONE } from './constants';

export const savePhoneNumber = (payload = {}) => {
  return {
    type: SAVE_PHONE,
    payload,
  };
};
