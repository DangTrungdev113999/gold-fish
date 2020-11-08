import {createSelector} from 'reselect';
import {rootReducerType} from '~/@types';

const shoesSelector = (state: rootReducerType) => state.shoes;

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

export const updateShoeLoadingSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.updateShoeLoading,
);

export const deleteShoeLoadingSelector = createSelector(
  shoesSelector,
  (shoesReducer) => shoesReducer.deleteShoeLoading,
);
