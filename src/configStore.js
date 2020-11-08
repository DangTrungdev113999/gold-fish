import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({ realtime: true })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const configStore = createStore(rootReducer, enhancer);

export default configStore;
