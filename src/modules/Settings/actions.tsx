import {
  FETCH_PRODUCT_TYPES,
  FETCH_PRODUCT_TYPES_SUCCEEDED,
  FETCH_PRODUCT_TYPES_FAILED,
  UPDATE_PRODUCT_TYPES,
  UPDATE_PRODUCT_TYPES_SUCCEEDED,
  UPDATE_PRODUCT_TYPES_FAILED,
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

export const updateProductTypes = () => {
  return {
    type: UPDATE_PRODUCT_TYPES,
  };
};

export const updateProductTypesSucceeded = (payload = {}) => {
  return {
    type: UPDATE_PRODUCT_TYPES_SUCCEEDED,
    payload,
  };
};

export const updateProductTypesFailed = (payload = {}) => {
  return {
    type: UPDATE_PRODUCT_TYPES_FAILED,
    payload,
  };
};
