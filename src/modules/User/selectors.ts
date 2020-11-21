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

export const addSuggestionLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.addSuggestionLoading,
);

export const updateSuggestionLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.updateSuggestionLoading,
);

export const fetchSuggestionLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.fetchSuggestionLoading,
);

export const fetchUserLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.fetchUserLoading,
);

export const addNewUserLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.addNewUserLoading,
);

export const updateUserLoadingSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.updateUserLoading,
);

export const ruleUserSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.rule,
);

export const favouriteShoesSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.favouriteShoes,
);

export const favouriteSlippersSelector = createSelector(
  userSelector,
  (userReducer) => userReducer.favouriteSlippers,
);
