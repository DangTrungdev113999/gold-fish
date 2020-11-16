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
      console.log('action.payload', action.payload);
      draft.token = action.payload.token;
      break;

    case REHYDRATE:
      console.log({ tokenREHYDRATE: action?.payload });
      draft.token = action?.payload?.auth?.token ?? initState.token;
      break;
  }
}, initState);

export default authReducer;
