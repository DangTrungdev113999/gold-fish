import produce from 'immer';
import { REHYDRATE } from 'redux-persist';
import { userReducerTypes } from '~/@types';

import { SAVE_PHONE } from './constants';

const initState: userReducerTypes = {
  profile: {
    phoneNumber: '',
    username: '',
    photoURL: '',
  },
};

const userReducer = produce((draft, action) => {
  switch (action.type) {
    case SAVE_PHONE:
      draft.profile.phoneNumber = action.payload.phoneNumber;
      break;
  }
}, initState);

export default userReducer;
