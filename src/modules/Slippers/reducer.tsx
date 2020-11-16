import produce from 'immer';
import { slipperType, slipperReducerTypes } from '~/@types';

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

const initState: slipperReducerTypes = {
  slippersList: [],
  fetchSlippersLoading: false,
  fetchSlippersError: '',
  loadMoreSlippersLoading: false,
  loadMoreSlippersError: '',
  addSlipperLoading: false,
  addSlipperError: '',
  updateSlipperLoading: false,
  updateSlipperError: '',
  deleteSlipperLoading: false,
  deleteSlipperError: '',
  lastSlipper: null,
};
const slipperReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_SLIPPERS:
      draft.fetchSlippersLoading = true;
      draft.fetchSlippersError = '';
      break;
    case FETCH_SLIPPERS_SUCCEEDED:
      draft.fetchSlippersLoading = false;
      draft.slippersList = action.payload.slippersList;
      draft.fetchSlippersError = '';
      break;
    case FETCH_SLIPPERS_FAILED:
      draft.fetchSlippersLoading = false;
      draft.fetchSlippersLoading = [];
      draft.fetchSlippersError = action.payload;
      break;

    case LOAD_MORE_SLIPPERS:
      draft.loadMoreSlippersLoading = true;
      draft.loadMoreSlippersError = '';
      break;
    case LOAD_MORE_SLIPPERS_SUCCEEDED:
      draft.loadMoreSlippersLoading = false;
      draft.slippersList.push(...action.payload.slippersList);
      draft.loadMoreSlippersError = '';
      break;
    case LOAD_MORE_SLIPPERS_FAILED:
      draft.loadMoreSlippersLoading = false;
      draft.loadMoreSlippersError = action.payload;
      break;

    case ADD_SLIPPER:
      draft.addSlipperLoading = true;
      draft.addSlipperError = '';
      break;
    case ADD_SLIPPER_SUCCEEDED:
      draft.addSlipperLoading = false;
      draft.slippersList.unshift(action.payload);
      draft.addSlipperError = '';
      break;
    case ADD_SLIPPER_FAILED:
      draft.addSlipperLoading = false;
      draft.addSlipperError = action.payload;
      break;

    case UPDATE_SLIPPER:
      draft.updateSlipperLoading = true;
      draft.updateSlipperError = '';
      break;
    case UPDATE_SLIPPER_SUCCEEDED: {
      const index = draft.slippersList.findIndex(
        (item: slipperType) => item.slipperId === action.payload.slipperId,
      );
      draft.updateSlipperLoading = false;
      draft.slippersList[index] = action.payload;
      draft.updateSlipperError = '';
      break;
    }
    case UPDATE_SLIPPER_FAILED:
      draft.updateSlipperLoading = false;
      draft.updateSlipperError = action.payload;
      break;

    case DELETE_SLIPPER:
      draft.deleteSlipperLoading = true;
      draft.deleteSlipperError = '';
      break;
    case DELETE_SLIPPER_SUCCEEDED: {
      const index = draft.slippersList.findIndex(
        (item: slipperType) => item.slipperId === action.payload.slipperId,
      );
      draft.deleteSlipperLoading = false;
      draft.slippersList.splice(index, 1);
      draft.deleteSlipperError = '';
      break;
    }
    case DELETE_SLIPPER_FAILED:
      draft.deleteSlipperLoading = false;
      draft.deleteSlipperError = action.payload;
      break;

    case SET_LAST_SLIPPER:
      draft.lastSlipper = action.payload.lastSlipper;
      break;
  }
}, initState);

export default slipperReducer;
