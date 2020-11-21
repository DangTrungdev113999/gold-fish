import {
  fetchSlippers,
  fetchSlippersSucceeded,
  fetchSlippersFailed,
  loadMoreSlippers,
  loadMoreSlippersSucceeded,
  loadMoreSlippersFailed,
  addSlipper,
  addSlipperSucceeded,
  addSlipperFailed,
  updateSlipper,
  updateSlipperSucceeded,
  updateSlipperFailed,
  deleteSlipper,
  deleteSlipperSucceeded,
  deleteSlipperFailed,
  setLastSlipper,
} from './actions';
import {
  fetchSlippersApi,
  updateSlippersApi,
  addSlippersApi,
  deleteSlippersApi,
  fetchMoreSlippersApi,
} from './apis';

export const fetchSlippersCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(fetchSlippers());
  try {
    const response: any = await fetchSlippersApi(payload.type);
    dispatch(setLastSlipper(response));
    dispatch(fetchSlippersSucceeded(response));
  } catch (e) {
    dispatch(fetchSlippersFailed(e.message));
  }
};

export const loadMoreSlippersCreator = () => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(loadMoreSlippers());
  try {
    const lastSlipper = getState().slippers.lastSlipper;
    const response: any = await fetchMoreSlippersApi(lastSlipper);
    dispatch(setLastSlipper(response));
    dispatch(loadMoreSlippersSucceeded(response));
  } catch (e) {
    dispatch(loadMoreSlippersFailed(e.message));
  }
};

export const addSlipperCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(addSlipper());
  try {
    const slipper = await addSlippersApi(payload.slipper);
    if (payload.onSuccess) {
      payload.onSuccess(slipper);
    }
    dispatch(addSlipperSucceeded(slipper));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(addSlipperFailed(e.message));
  }
};

export const updateSlipperCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(updateSlipper());
  try {
    const slipper = await updateSlippersApi(payload.slipper);
    if (payload.onSuccess) {
      payload.onSuccess(slipper);
    }
    dispatch(updateSlipperSucceeded(slipper));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(updateSlipperFailed(e.message));
  }
};

export const deleteSlipperCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(deleteSlipper());
  try {
    const slipper = await deleteSlippersApi(payload.slipper);
    if (payload.onSuccess) {
      payload.onSuccess(slipper);
    }
    dispatch(deleteSlipperSucceeded(slipper));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(deleteSlipperFailed(e.message));
  }
};
