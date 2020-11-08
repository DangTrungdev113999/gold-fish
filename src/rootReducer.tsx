import {combineReducers} from 'redux';

import shoesReducer from '~/modules/shoes/reducer';

const rootReducer = combineReducers({
  shoes: shoesReducer,
});

export default rootReducer;
