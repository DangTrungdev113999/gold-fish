import {
  FETCH_PRODUCT_TYPES,
  FETCH_PRODUCT_TYPES_SUCCEEDED,
  FETCH_PRODUCT_TYPES_FAILED,
} from './constants';

export const fetchProductTypes = () => {
  return {
    type: FETCH_PRODUCT_TYPES,
  };
};

export const fetchProductTypesSucceeded = (payload = {}) => {
  return {
    type: FETCH_PRODUCT_TYPES_SUCCEEDED,
    payload,
  };
};

export const fetchProductTypesFailed = (payload = {}) => {
  return {
    type: FETCH_PRODUCT_TYPES_FAILED,
    payload,
  };
};
