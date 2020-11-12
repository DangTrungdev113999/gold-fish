import {
  fetchProductTypes,
  fetchProductTypesSucceeded,
  fetchProductTypesFailed,
} from './actions';
import { fetchProductTypesApi } from './apis';

export const fetchProductTypesCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(fetchProductTypes());
  try {
    const response: any = await fetchProductTypesApi();
    if (payload.onSuccess) {
      payload.onSuccess(response);
    }
    dispatch(fetchProductTypesSucceeded(response));
  } catch (e) {
    dispatch(fetchProductTypesFailed(e.message));
  }
};
