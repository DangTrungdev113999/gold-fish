import produce from 'immer';
import { REHYDRATE } from 'redux-persist';
import { authReducerTypes } from '~/@types';

import { SET_TOKEN } from './constants';

const initState: authReducerTypes = {
  token: '',
};

const authReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_TOKEN:
      draft.token = action.payload.token;
      break;
  }
}, initState);

export default authReducer;
