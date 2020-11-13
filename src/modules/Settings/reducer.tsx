import produce from 'immer';
import { settingsReducerTypes } from '~/@types';

import {
  FETCH_PRODUCT_TYPES,
  FETCH_PRODUCT_TYPES_SUCCEEDED,
  FETCH_PRODUCT_TYPES_FAILED,
  UPDATE_PRODUCT_TYPES,
  UPDATE_PRODUCT_TYPES_SUCCEEDED,
  UPDATE_PRODUCT_TYPES_FAILED,
} from './constants';

const initState: settingsReducerTypes = {
  shoeTypes: [],
  slipperTypes: [],
  fetchProductsLoading: false,
  fetchProductsError: '',
  updateProductsLoading: false,
  updateProductsError: '',
};
const settingsReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_TYPES:
      draft.fetchProductsLoading = true;
      draft.fetchProductsError = '';
      break;
    case FETCH_PRODUCT_TYPES_SUCCEEDED:
      draft.fetchProductsLoading = false;
      draft.shoeTypes = action.payload.shoeTypes;
      draft.slipperTypes = action.payload.slipperTypes;
      break;
    case FETCH_PRODUCT_TYPES_FAILED:
      draft.fetchProductsLoading = false;
      draft.fetchProductsError = action.payload;
      break;

    case UPDATE_PRODUCT_TYPES:
      draft.updateProductsLoading = true;
      draft.fetchProductsError = '';
      break;
    case UPDATE_PRODUCT_TYPES_SUCCEEDED:
      draft.updateProductsLoading = false;

      if (action.payload.shoeTypes) {
        draft.shoeTypes = action.payload.shoeTypes;
      }
      if (action.payload.slipperTypes) {
        draft.slipperTypes = action.payload.slipperTypes;
      }
      break;
    case UPDATE_PRODUCT_TYPES_FAILED:
      draft.updateProductsLoading = false;
      draft.updateProductsError = action.payload;
      break;
  }
}, initState);

export default settingsReducer;
