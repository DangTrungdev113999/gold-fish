import {
  fetchFavoriteShoesList,
  fetchFavoriteShoesListSucceeded,
  fetchFavoriteShoesListFailed,
} from './actions';
import { fetchFavouriteShoesListApi } from './apis';

export const fetchFavouriteShoesListCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(fetchFavoriteShoesList());
  try {
    const response = await fetchFavouriteShoesListApi(payload.favouriteShoes);
    if (payload.onSuccess) {
      payload.onSuccess(response);
    }
    dispatch(fetchFavoriteShoesListSucceeded(response));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(fetchFavoriteShoesListFailed(e.message));
  }
};
