import { combineReducers } from 'redux';

import authReducer from '~/modules/Auth/reducer';
import shoesReducer from '~/modules/Shoes/reducer';
import slippersReducer from '~/modules/Slippers/reducer';
import settingsReducer from '~/modules/Settings/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  shoes: shoesReducer,
  slippers: slippersReducer,
  settings: settingsReducer,
});

export default rootReducer;
