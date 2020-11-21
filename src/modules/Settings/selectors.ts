import { createSelector } from 'reselect';
import { rootReducerTypes } from '~/@types';

const slippersSelector = (state: rootReducerTypes) => state.settings;

export const shoeTypesSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.shoeTypes,
);

export const slipperTypesSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.slipperTypes,
);

export const fetchProductTypesLoadingSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.fetchProductsLoading,
);

export const updateProductTypesLoadingSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.updateProductsLoading,
);
