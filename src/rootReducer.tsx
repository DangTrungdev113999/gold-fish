import { combineReducers } from 'redux';

import shoesReducer from '~/modules/Shoes/reducer';
import slippersReducer from '~/modules/Slippers/reducer';

const rootReducer = combineReducers({
  shoes: shoesReducer,
  slippers: slippersReducer,
});

export default rootReducer;
