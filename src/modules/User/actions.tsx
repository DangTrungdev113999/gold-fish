import {
  SAVE_PHONE,
  ADD_SUGGESTION,
  ADD_SUGGESTION_SUCCEEDED,
  ADD_SUGGESTION_FAILED,
  UPDATE_SUGGESTION,
  UPDATE_SUGGESTION_SUCCEEDED,
  UPDATE_SUGGESTION_FAILED,
} from './constants';

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

export const udpateSuggestion = () => {
  return {
    type: UPDATE_SUGGESTION,
  };
};

export const udpateSuggestionSucceeded = (payload = {}) => {
  return {
    type: UPDATE_SUGGESTION_SUCCEEDED,
    payload,
  };
};

export const udpateSuggestionFailed = (payload = {}) => {
  return {
    type: UPDATE_SUGGESTION_FAILED,
    payload,
  };
};
