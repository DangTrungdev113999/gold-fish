import produce from 'immer';
import { settingsReducerTypes } from '~/@types';

import {
  FETCH_PRODUCT_TYPES,
  FETCH_PRODUCT_TYPES_SUCCEEDED,
  FETCH_PRODUCT_TYPES_FAILED,
} from './constants';

const initState: settingsReducerTypes = {
  shoeTypes: [],
  slipperTypes: [],
  fetchProductsLoading: false,
  fetchProductsError: '',
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
  }
}, initState);

export default settingsReducer;
