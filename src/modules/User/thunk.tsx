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
  fetchUser,
  fetchUserSucceeded,
  fetchUserFailed,
  addNewUser,
  addNewUserSucceeded,
  addNewUserFailed,
  updateUser,
  updateUserSucceeded,
  updateUserFailed,
} from './actions';
import {
  addSuggestionApi,
  updateSuggestionApi,
  fetchSuggestionApi,
  fetchUserApi,
  addNewUserApi,
  updateUserApi,
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

export const fetchUserCreator = () => async (dispatch: any, getState: any) => {
  dispatch(fetchUser());
  try {
    const userId = getState().user.profile.phoneNumber;
    const response = await fetchUserApi(userId);
    dispatch(fetchUserSucceeded(response));
  } catch (e) {
    dispatch(fetchUserFailed(e.message));
  }
};

export const addNewUserCreator = (padyload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(addNewUser());
  try {
    const response = await addNewUserApi(padyload.user);
    dispatch(addNewUserSucceeded(response));
  } catch (e) {
    dispatch(addNewUserFailed(e.message));
  }
};

export const udpateUserCreator = (padyload: any = {}) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(updateUser());
  try {
    const userId = getState().user.profile.phoneNumber;
    const response = await updateUserApi(userId, padyload.data);
    dispatch(updateUserSucceeded(response));
  } catch (e) {
    dispatch(updateUserFailed(e.message));
  }
};
