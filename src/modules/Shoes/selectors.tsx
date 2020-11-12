import { createSelector } from 'reselect';
import { rootReducerTypes } from '~/@types';

const shoesSelector = (state: rootReducerTypes) => state.shoes;

export const shoesListSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.shoesList,
);

export const fetchShoesLoadingSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.fetchShoesLoading,
);

export const loadMoreShoesLoadingSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.loadMoreShoesLoading,
);

export const addShoeLoadingSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.addShoeLoading,
);

export const updateShoeLoadingSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.updateShoeLoading,
);

export const deleteShoeLoadingSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.deleteShoeLoading,
);
export const lastShoeSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.lastShoe,
);
