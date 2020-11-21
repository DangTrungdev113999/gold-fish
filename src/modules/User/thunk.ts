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
    const profile = getState().user.profile;
    const response = await fetchSuggestionApi(profile);
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
    let response;
    const result = await fetchSuggestionApi(payload.profile);
    if (result?.profile?.phoneNumber === payload.profile.phoneNumber) {
      response = result;
    } else {
      response = await addSuggestionApi(payload.profile, payload.data);
    }
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
    const phoneNumber = getState().user.profile.phoneNumber;
    const response = await fetchUserApi(phoneNumber);
    dispatch(fetchUserSucceeded(response));
  } catch (e) {
    dispatch(fetchUserFailed(e.message));
  }
};

export const addNewUserCreator = (payload: any = {}) => async (
  dispatch: any,
) => {
  dispatch(addNewUser());
  try {
    let response;
    const result = await fetchUserApi(payload.user.profile.phoneNumber);
    if (result?.profile?.phoneNumber === payload.user.profile.phoneNumber) {
      response = result;
    } else {
      response = await addNewUserApi(payload.user);
    }
    dispatch(addNewUserSucceeded(response));
  } catch (e) {
    dispatch(addNewUserFailed(e.message));
  }
};

export const updateUserCreator = (payload: any = {}) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(updateUser());
  try {
    const phoneNumber = getState().user.profile.phoneNumber;
    const response = await updateUserApi(phoneNumber, payload.data);
    dispatch(updateUserSucceeded(response));
    if (payload.onSuccess) {
      payload.onSuccess(response);
    }
  } catch (e) {
    if (payload.onError) {
      payload.onError(e.message);
    }
    dispatch(updateUserFailed(e.message));
  }
};
