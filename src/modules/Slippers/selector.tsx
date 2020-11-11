import { createSelector } from 'reselect';
import { rootReducerType } from '~/@types';

const slippersSelector = (state: rootReducerType) => state.slippers;

export const slippersListSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.slippersList,
);

export const fetchSlippersLoadingSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.fetchSlippersLoading,
);

export const loadMoreSlippersLoadingSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.loadMoreSlippersLoading,
);

export const addSlipperLoadingSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.addSlipperLoading,
);

export const updateSlipperLoadingSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.updateSlipperLoading,
);

export const deleteSlipperLoadingSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.deleteSlipperLoading,
);
export const lastSlipperSelector = createSelector(
  slippersSelector,
  (slippersReducer) => slippersReducer.lastSlipper,
);
