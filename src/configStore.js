import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import JSOG from 'jsog';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import rootReducer from './rootReducer';

export const JSOGTransform = createTransform();
// (inboundState, key) => JSOG.encode(inboundState),
// (outboundState, key) => JSOG.decode(outboundState),

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  stateReconciler: autoMergeLevel2,
  transforms: [JSOGTransform],
};

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({ realtime: true })
    : compose;

export default (onCompletion) => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const enhancer = composeEnhancers(applyMiddleware(thunk));
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store, null, onCompletion);
  return {
    store,
    persistor,
  };
};
