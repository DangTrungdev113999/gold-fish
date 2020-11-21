import {
  FETCH_FAVOURITE_SHOES,
  FETCH_FAVOURITE_SHOES_SUCCEEDED,
  FETCH_FAVOURITE_SHOES_FAILED,
} from './constants';


export const fetchFavoriteShoesList = () => {
  return {
    type: FETCH_FAVOURITE_SHOES,
  };
};

export const fetchFavoriteShoesListSucceeded = (payload = {}) => {
  return {
    type: FETCH_FAVOURITE_SHOES_SUCCEEDED,
    payload,
  };
};

export const fetchFavoriteShoesListFailed = (payload = {}) => {
  return {
    type: FETCH_FAVOURITE_SHOES_FAILED,
    payload,
  };
};
