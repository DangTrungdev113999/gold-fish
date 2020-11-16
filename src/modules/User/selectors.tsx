import { createSelector } from 'reselect';
import { rootReducerTypes } from '~/@types';

const userSelector = (state: rootReducerTypes) => state.user;

export const profileSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.profile,
);
