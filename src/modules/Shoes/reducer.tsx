import produce from 'immer';
import { shoesReducerTypes } from '~/@types';

import {
  FETCH_SHOES,
  FETCH_SHOES_SUCCEEDED,
  FETCH_SHOES_FAILED,
  LOAD_MORE_SHOES,
  LOAD_MORE_SHOES_SUCCEEDED,
  LOAD_MORE_SHOES_FAILED,
  ADD_SHOE,
  ADD_SHOE_SUCCEEDED,
  ADD_SHOE_FAILED,
  UPDATE_SHOE,
  UPDATE_SHOE_SUCCEEDED,
  UPDATE_SHOE_FAILED,
  DELETE_SHOE,
  DELETE_SHOE_SUCCEEDED,
  DELETE_SHOE_FAILED,
  SET_LAST_SHOE,
  FETCH_FAVOURITE_SHOES,
  FETCH_FAVOURITE_SHOES_SUCCEEDED,
  FETCH_FAVOURITE_SHOES_FAILED,
} from './constants';

import { shoeTypes } from '~/@types';

const initState: shoesReducerTypes = {
  shoesList: [],
  fetchShoesLoading: false,
  fetchShoesError: '',
  loadMoreShoesLoading: false,
  loadMoreShoesError: '',
  addShoeLoading: false,
  addShoeError: '',
  updateShoeLoading: false,
  updateShoeError: '',
  deleteShoeLoading: false,
  deleteShoeError: '',
  lastShoe: null,
  favouriteShoesList: [],
  fetchFavouriteShoesLoaing: false,
  fetchFavouriteShoesError: '',
};
const shoeReducer = produce((draft, action) => {
  switch (action.type) {
    case FETCH_SHOES:
      draft.fetchShoesLoading = true;
      draft.fetchShoesError = '';
      break;
    case FETCH_SHOES_SUCCEEDED:
      draft.fetchShoesLoading = false;
      draft.shoesList = action.payload.shoesList;
      draft.fetchShoesError = '';
      draft.loadMoreShoesLoading = false;
      break;
    case FETCH_SHOES_FAILED:
      draft.fetchShoesLoading = false;
      draft.shoesList = [];
      draft.fetchShoesError = action.payload;
      draft.loadMoreShoesLoading = false;
      break;

    case LOAD_MORE_SHOES:
      draft.loadMoreShoesLoading = true;
      draft.loadMoreShoesError = '';
      break;
    case LOAD_MORE_SHOES_SUCCEEDED:
      draft.loadMoreShoesLoading = false;
      draft.shoesList.push(...action.payload.shoesList);
      draft.loadMoreShoesError = '';
      break;
    case LOAD_MORE_SHOES_FAILED:
      draft.loadMoreShoesLoading = false;
      draft.loadMoreShoesError = action.payload;
      break;

    case ADD_SHOE:
      draft.addShoeLoading = true;
      draft.addShoeError = '';
      break;
    case ADD_SHOE_SUCCEEDED:
      draft.addShoeLoading = false;
      draft.shoesList.unshift(action.payload);
      draft.addShoeError = '';
      break;
    case ADD_SHOE_FAILED:
      draft.addShoeLoading = false;
      draft.addShoeError = action.payload;
      break;

    case UPDATE_SHOE:
      draft.updateShoeLoading = true;
      draft.updateShoeError = '';
      break;
    case UPDATE_SHOE_SUCCEEDED: {
      const index = draft.shoesList.findIndex(
        (item: shoeTypes) => item.shoeId === action.payload.shoeId,
      );
      draft.updateShoeLoading = false;
      draft.shoesList[index] = action.payload;
      draft.updateShoeError = '';
      break;
    }
    case UPDATE_SHOE_FAILED:
      draft.updateShoeLoading = false;
      draft.updateShoeError = action.payload;
      break;

    case DELETE_SHOE:
      draft.deleteShoeLoading = true;
      draft.deleteShoeError = '';
      break;
    case DELETE_SHOE_SUCCEEDED: {
      const index = draft.shoesList.findIndex(
        (item: shoeTypes) => item.shoeId === action.payload.shoeId,
      );
      draft.deleteShoeLoading = false;
      draft.shoesList.splice(index, 1);
      draft.deleteShoeError = '';
      break;
    }
    case DELETE_SHOE_FAILED:
      draft.deleteShoeLoading = false;
      draft.deleteShoeError = action.payload;
      break;

    case SET_LAST_SHOE:
      draft.lastShoe = action.payload.lastShoe;
      break;

    case FETCH_FAVOURITE_SHOES:
      draft.fetchFavouriteShoesLoaing = true;
      draft.fetchFavouriteShoesError = '';
      break;
    case FETCH_FAVOURITE_SHOES_SUCCEEDED:
      draft.fetchFavouriteShoesLoaing = false;
      draft.fetchFavouriteShoesError = '';
      draft.favouriteShoesList = action.payload.favouriteShoesList;
      break;
    case FETCH_FAVOURITE_SHOES_FAILED:
      draft.fetchFavouriteShoesLoaing = false;
      draft.fetchFavouriteShoesError = action.payload;
      break;
  }
}, initState);

export default shoeReducer;
