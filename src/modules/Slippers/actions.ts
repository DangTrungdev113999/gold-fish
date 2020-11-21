import {
  FETCH_SLIPPERS,
  FETCH_SLIPPERS_SUCCEEDED,
  FETCH_SLIPPERS_FAILED,
  LOAD_MORE_SLIPPERS,
  LOAD_MORE_SLIPPERS_SUCCEEDED,
  LOAD_MORE_SLIPPERS_FAILED,
  ADD_SLIPPER,
  ADD_SLIPPER_SUCCEEDED,
  ADD_SLIPPER_FAILED,
  UPDATE_SLIPPER,
  UPDATE_SLIPPER_SUCCEEDED,
  UPDATE_SLIPPER_FAILED,
  DELETE_SLIPPER,
  DELETE_SLIPPER_SUCCEEDED,
  DELETE_SLIPPER_FAILED,
  SET_LAST_SLIPPER,
} from './constants';

export const fetchSlippers = () => {
  return {
    type: FETCH_SLIPPERS,
  };
};

export const fetchSlippersSucceeded = (payload = {}) => {
  return {
    type: FETCH_SLIPPERS_SUCCEEDED,
    payload,
  };
};

export const fetchSlippersFailed = (payload = {}) => {
  return {
    type: FETCH_SLIPPERS_FAILED,
    payload,
  };
};

export const loadMoreSlippers = () => {
  return {
    type: LOAD_MORE_SLIPPERS,
  };
};

export const loadMoreSlippersSucceeded = (payload = {}) => {
  return {
    type: LOAD_MORE_SLIPPERS_SUCCEEDED,
    payload,
  };
};

export const loadMoreSlippersFailed = (payload = {}) => {
  return {
    type: LOAD_MORE_SLIPPERS_FAILED,
    payload,
  };
};

export const addSlipper = () => {
  return {
    type: ADD_SLIPPER,
  };
};

export const addSlipperSucceeded = (payload = {}) => {
  return {
    type: ADD_SLIPPER_SUCCEEDED,
    payload,
  };
};

export const addSlipperFailed = (payload = {}) => {
  return {
    type: ADD_SLIPPER_FAILED,
    payload,
  };
};

export const updateSlipper = () => {
  return {
    type: UPDATE_SLIPPER,
  };
};

export const updateSlipperSucceeded = (payload = {}) => {
  return {
    type: UPDATE_SLIPPER_SUCCEEDED,
    payload,
  };
};

export const updateSlipperFailed = (payload = {}) => {
  return {
    type: UPDATE_SLIPPER_FAILED,
    payload,
  };
};

export const deleteSlipper = (payload = {}) => {
  return {
    type: DELETE_SLIPPER,
    payload,
  };
};

export const deleteSlipperSucceeded = (payload = {}) => {
  return {
    type: DELETE_SLIPPER_SUCCEEDED,
    payload,
  };
};

export const deleteSlipperFailed = (payload = {}) => {
  return {
    type: DELETE_SLIPPER_FAILED,
    payload,
  };
};

export const setLastSlipper = (payload = {}) => {
  return {
    type: SET_LAST_SLIPPER,
    payload,
  };
};
