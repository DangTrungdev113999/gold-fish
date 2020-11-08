import {
  FETCH_SHOES,
  FETCH_SHOES_SUCCEEDED,
  FETCH_SHOES_FAILED,
  LOAD_MORE_SHOES,
  LOAD_MORE_SHOES_SUCCEEDED,
  LOAD_MORE_SHOES_FAILED,
  UPDATE_SHOE,
  UPDATE_SHOE_SUCCEEDED,
  UPDATE_SHOE_FAILED,
  DELETE_SHOE,
  DELETE_SHOE_SUCCEEDED,
  DELETE_SHOE_FAILED,
} from './constants';

export const fetchShoes = () => {
  return {
    type: FETCH_SHOES,
  };
};

export const fetchShoesSucceeded = (payload = {}) => {
  return {
    type: FETCH_SHOES_SUCCEEDED,
    payload,
  };
};

export const fetchShoesFailed = (payload = {}) => {
  return {
    type: FETCH_SHOES_FAILED,
    payload,
  };
};

export const loadMoreShoes = () => {
  return {
    type: LOAD_MORE_SHOES,
  };
};

export const loadMoreShoesSucceeded = (payload = {}) => {
  return {
    type: LOAD_MORE_SHOES_SUCCEEDED,
    payload,
  };
};

export const loadMoreShoesFailed = (payload = {}) => {
  return {
    type: LOAD_MORE_SHOES_FAILED,
    payload,
  };
};

export const updateShoe = (payload = {}) => {
  return {
    type: UPDATE_SHOE,
    payload,
  };
};

export const updateShoeSucceeded = (payload = {}) => {
  return {
    type: UPDATE_SHOE_SUCCEEDED,
    payload,
  };
};

export const updateShoeFailed = (payload = {}) => {
  return {
    type: UPDATE_SHOE_FAILED,
    payload,
  };
};

export const deleteShoe = (payload = {}) => {
  return {
    type: DELETE_SHOE,
    payload,
  };
};

export const deleteShoeSucceeded = (payload = {}) => {
  return {
    type: DELETE_SHOE_SUCCEEDED,
    payload,
  };
};

export const deleteShoeFailed = (payload = {}) => {
  return {
    type: DELETE_SHOE_FAILED,
    payload,
  };
};
