import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  timeout: 10000,
  storage: AsyncStorage,
  version: 1,
  stateReconciler: autoMergeLevel2,
};

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools({ realtime: true })
    : compose;

export default () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const enhancer = composeEnhancers(applyMiddleware(thunk));
  const store = createStore(persistedReducer, enhancer);
  const persistor = persistStore(store);
  return {
    store,
    persistor,
  };
};
