import { createSelector } from 'reselect';
import { rootReducerTypes } from '~/@types';

const userSelector = (state: rootReducerTypes) => state.user;

export const profileSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.profile,
);

export const shoePrefixesSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.shoePrefixes,
);

export const slipperPrefixesSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.slipperPrefixes,
);

export const colorCodesSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.colorCodes,
);

export const updateSuggestionLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.updateSuggestionLoading,
);

export const fetchSuggestionLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.fetchSuggestionLoading,
);
