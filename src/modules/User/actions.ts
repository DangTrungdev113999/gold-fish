import {
  SAVE_PHONE,
  FETCH_SUGGESTION,
  FETCH_SUGGESTION_SUCCEEDED,
  FETCH_SUGGESTION_FAILED,
  ADD_SUGGESTION,
  ADD_SUGGESTION_SUCCEEDED,
  ADD_SUGGESTION_FAILED,
  UPDATE_SUGGESTION,
  UPDATE_SUGGESTION_SUCCEEDED,
  UPDATE_SUGGESTION_FAILED,
  FETCH_USER,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED,
  ADD_NEW_USER,
  ADD_NEW_USER_SUCCEEDED,
  ADD_NEW_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
} from './constants';

export const fetchSuggestion = () => {
  return {
    type: FETCH_SUGGESTION,
  };
};

export const fetchSuggestionSucceeded = (payload = {}) => {
  return {
    type: FETCH_SUGGESTION_SUCCEEDED,
    payload,
  };
};

export const fetchSuggestionFailed = (payload = {}) => {
  return {
    type: FETCH_SUGGESTION_FAILED,
    payload,
  };
};

export const savePhoneNumber = (payload = {}) => {
  return {
    type: SAVE_PHONE,
    payload,
  };
};

export const addSuggestion = () => {
  return {
    type: ADD_SUGGESTION,
  };
};

export const addSuggestionSucceeded = (payload = {}) => {
  return {
    type: ADD_SUGGESTION_SUCCEEDED,
    payload,
  };
};

export const addSuggestionFailed = (payload = {}) => {
  return {
    type: ADD_SUGGESTION_FAILED,
    payload,
  };
};

export const updateSuggestion = () => {
  return {
    type: UPDATE_SUGGESTION,
  };
};

export const updateSuggestionSucceeded = (payload = {}) => {
  return {
    type: UPDATE_SUGGESTION_SUCCEEDED,
    payload,
  };
};

export const updateSuggestionFailed = (payload = {}) => {
  return {
    type: UPDATE_SUGGESTION_FAILED,
    payload,
  };
};

export const fetchUser = () => {
  return {
    type: FETCH_USER,
  };
};

export const fetchUserSucceeded = (payload = {}) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload,
  };
};

export const fetchUserFailed = (payload = {}) => {
  return {
    type: FETCH_USER_FAILED,
    payload,
  };
};

export const addNewUser = () => {
  return {
    type: ADD_NEW_USER,
  };
};

export const addNewUserSucceeded = (payload = {}) => {
  return {
    type: ADD_NEW_USER_SUCCEEDED,
    payload,
  };
};

export const addNewUserFailed = (payload = {}) => {
  return {
    type: ADD_NEW_USER_FAILED,
    payload,
  };
};

export const updateUser = () => {
  return {
    type: UPDATE_USER,
  };
};

export const updateUserSucceeded = (payload = {}) => {
  return {
    type: UPDATE_USER_SUCCEEDED,
    payload,
  };
};

export const updateUserFailed = (payload = {}) => {
  return {
    type: UPDATE_USER_FAILED,
    payload,
  };
};
