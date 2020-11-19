import {
  fetchShoes,
  fetchShoesSucceeded,
  fetchShoesFailed,
  loadMoreShoes,
  loadMoreShoesSucceeded,
  loadMoreShoesFailed,
  addShoe,
  addShoeSucceeded,
  addShoeFailed,
  updateShoe,
  updateShoeSucceeded,
  updateShoeFailed,
  deleteShoe,
  deleteShoeSucceeded,
  deleteShoeFailed,
  setlastShoe,
  fetchFavoriteShoesList,
  fetchFavoriteShoesListSucceeded,
  fetchFavoriteShoesListFailed,
} from './actions';
import {
  fetchShoesApi,
  updateShoesApi,
  addShoesApi,
  deleteShoesApi,
  fetchMoreShoesApi,
  fetchFavouriteShoesListApi,
} from './apis';

export const fetchShoesCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(fetchShoes());
  try {
    const response: any = await fetchShoesApi(payload.type);
    dispatch(setlastShoe(response));
    dispatch(fetchShoesSucceeded(response));
  } catch (e) {
    dispatch(fetchShoesFailed(e.message));
  }
};

export const loadMoreShoesCreator = () => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(loadMoreShoes());
  try {
    const lastShoe = getState().shoes.lastShoe;
    const response: any = await fetchMoreShoesApi(lastShoe);
    dispatch(setlastShoe(response));
    dispatch(loadMoreShoesSucceeded(response));
  } catch (e) {
    dispatch(loadMoreShoesFailed(e.message));
  }
};

export const addShoeCreator = (payload: any = {}) => async (dispatch: any) => {
  dispatch(addShoe());
  try {
    const shoe = await addShoesApi(payload.shoe);
    if (payload.onSuccess) {
      payload.onSuccess(shoe);
    }
    dispatch(addShoeSucceeded(shoe));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(addShoeFailed(e.message));
  }
};

export const updateShoeCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(updateShoe());
  try {
    const shoe = await updateShoesApi(payload.shoe);
    if (payload.onSuccess) {
      payload.onSuccess(shoe);
    }
    dispatch(updateShoeSucceeded(shoe));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(updateShoeFailed(e.message));
  }
};

export const deleteShoeCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(deleteShoe());
  try {
    const shoe = await deleteShoesApi(payload.shoe);
    if (payload.onSuccess) {
      payload.onSuccess(shoe);
    }
    dispatch(deleteShoeSucceeded(shoe));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(deleteShoeFailed(e.message));
  }
};

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
