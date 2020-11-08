import produce from 'immer';
import { shoeReducerType } from '~/@types';

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

const initState: shoeReducerType = {
  shoesList: [],
  fetchShoesLoading: false,
  fetchShoesError: '',
  loadMoreShoesLoading: false,
  loadMoreShoesError: '',
  updateShoeLoading: false,
  updateShoeError: '',
  deleteShoeLoading: false,
  deleteShoeError: '',
};
const shoeReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_SHOES:
      draft.fetchShoesLoading = true;
      draft.error = '';
      break;
    case FETCH_SHOES_SUCCEEDED:
      draft.fetchShoesLoading = false;
      draft.shoes = action.payload;
      break;
    case FETCH_SHOES_FAILED:
      draft.fetchShoesLoading = false;
      draft.fetchShoesError = action.payload;
      break;

    case LOAD_MORE_SHOES:
      draft.loadMoreShoesLoading = true;
      draft.loadMoreShoesError = '';
      break;
    case LOAD_MORE_SHOES_SUCCEEDED:
      draft.loadMoreShoesLoading = false;
      draft.shoes = action.payload;
      break;
    case LOAD_MORE_SHOES_FAILED:
      draft.loadMoreShoesLoading = false;
      draft.loadMoreShoesError = action.payload;
      break;

    case UPDATE_SHOE:
      draft.updateShoeLoading = true;
      draft.updateShoeError = '';
      break;
    case UPDATE_SHOE_SUCCEEDED:
      draft.updateShoeLoading = false;
      draft.shoes = action.payload;
      break;
    case UPDATE_SHOE_FAILED:
      draft.updateShoeLoading = false;
      draft.updateShoeError = action.payload;
      break;

    case DELETE_SHOE:
      draft.deleteShoeLoading = true;
      draft.deleteShoeError = '';
      break;
    case DELETE_SHOE_SUCCEEDED:
      draft.deleteShoeLoading = false;
      draft.shoes = action.payload;
      break;
    case DELETE_SHOE_FAILED:
      draft.deleteShoeLoading = false;
      draft.deleteShoeError = action.payload;
      break;
  }
}, initState);

export default shoeReducer;
