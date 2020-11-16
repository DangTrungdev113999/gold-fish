import { combineReducers } from 'redux';

import authReducer from '~/modules/Auth/reducer';
import userReducer from '~/modules/User/reducer';
import shoesReducer from '~/modules/Shoes/reducer';
import slippersReducer from '~/modules/Slippers/reducer';
import settingsReducer from '~/modules/Settings/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  shoes: shoesReducer,
  slippers: slippersReducer,
  settings: settingsReducer,
});

export default rootReducer;
