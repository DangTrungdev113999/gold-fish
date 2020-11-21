import produce from 'immer';
import { favouriteReducerTypes } from '~/@types';

import {
  FETCH_FAVOURITE_SHOES,
  FETCH_FAVOURITE_SHOES_SUCCEEDED,
  FETCH_FAVOURITE_SHOES_FAILED,
} from './constants';

const initState: favouriteReducerTypes = {
  favouriteShoesList: [],
  fetchFavouriteShoesLoaing: false,
  fetchFavouriteShoesError: '',
};
const favouriteReducer = produce((draft, action) => {
  switch (action.type) {
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

export default favouriteReducer;
