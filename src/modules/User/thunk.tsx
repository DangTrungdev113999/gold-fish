import { rootReducerTypes } from '~/@types';
import {
  fetchSuggestion,
  fetchSuggestionSucceeded,
  fetchSuggestionFailed,
  addSuggestion,
  addSuggestionSucceeded,
  addSuggestionFailed,
  updateSuggestion,
  updateSuggestionSucceeded,
  updateSuggestionFailed,
} from './actions';
import {
  addSuggestionApi,
  updateSuggestionApi,
  fetchSuggestionApi,
} from './apis';

export const fetchSuggestionCreator = () => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(fetchSuggestion());
  try {
    const user = getState().user.profile;
    const response = await fetchSuggestionApi(user);
    dispatch(fetchSuggestionSucceeded(response));
  } catch (e) {
    dispatch(fetchSuggestionFailed(e.message));
  }
};

export const addSuggestionCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(addSuggestion());
  try {
    const response = await addSuggestionApi(payload.user, payload.data);
    dispatch(addSuggestionSucceeded(response));
  } catch (e) {
    dispatch(addSuggestionFailed(e.message));
  }
};

export const updateSuggestionCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(updateSuggestion());
  try {
    const response = await updateSuggestionApi(payload.user, payload.data);
    if (payload.onSuccess) {
      payload.onSuccess(response);
    }
    dispatch(updateSuggestionSucceeded(response));
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(updateSuggestionFailed(e.message));
  }
};
