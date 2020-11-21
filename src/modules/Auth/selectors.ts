import { createSelector } from 'reselect';
import { rootReducerTypes } from '~/@types';

const authSelector = (state: rootReducerTypes) => state.auth;

export const tokenSelector = createSelector(
  authSelector,
  (authReducer) => authReducer.token,
);
