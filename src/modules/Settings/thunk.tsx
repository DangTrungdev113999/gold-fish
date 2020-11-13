import {
  fetchProductTypes,
  fetchProductTypesSucceeded,
  fetchProductTypesFailed,
  updateProductTypes,
  updateProductTypesSucceeded,
  updateProductTypesFailed,
} from './actions';
import { fetchProductTypesApi, udpateProductTypesApi } from './apis';

export const fetchProductTypesCreator = () => async (dispatch: any) => {
  dispatch(fetchProductTypes());
  try {
    const response: any = await fetchProductTypesApi();
    dispatch(fetchProductTypesSucceeded(response));
  } catch (e) {
    dispatch(fetchProductTypesFailed(e.message));
  }
};

export const updateProductTypesCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  try {
    dispatch(updateProductTypes());
    const response: any = await udpateProductTypesApi(
      payload.data,
      payload.target,
    );
    if (payload.onSuccess) {
      payload.onSuccess(response);
    }
    dispatch(updateProductTypesSucceeded(response));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(updateProductTypesFailed(e.message));
  }
};
