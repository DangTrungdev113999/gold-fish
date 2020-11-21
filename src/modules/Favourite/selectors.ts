import { createSelector } from 'reselect';
import { rootReducerTypes } from '~/@types';

const favouriteSelector = (state: rootReducerTypes) => state.favourite;

export const favouriteShoesListSelector = createSelector(
  favouriteSelector,
  (favouriteReducer) => favouriteReducer.favouriteShoesList,
);

export const fetchFavouriteShoesListLoaingSelector = createSelector(
  favouriteSelector,
  (favouriteReducer) => favouriteReducer.fetchFavouriteShoesLoaing,
);
