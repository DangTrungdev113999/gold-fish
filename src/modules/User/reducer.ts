import produce from 'immer';
import { userReducerTypes } from '~/@types';

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
  FETCH_USER_FAILED,
  FETCH_USER_SUCCEEDED,
  ADD_NEW_USER,
  ADD_NEW_USER_SUCCEEDED,
  ADD_NEW_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
} from './constants';

const initState: userReducerTypes = {
  profile: {
    phoneNumber: '',
    username: '',
    photoURL: '',
  },
  shoePrefixes: [],
  slipperPrefixes: [],
  colorCodes: [],
  favouriteShoes: [],
  favouriteSlippers: [],
  rule: '',
  fetchSuggestionLoading: false,
  fetchSuggestionError: '',
  addSuggestionLoading: false,
  addSuggestionError: '',
  updateSuggestionLoading: false,
  updateSuggestionError: '',
  fetchUserLoading: false,
  fetchUserError: '',
  addNewUserLoading: false,
  addNewUserError: '',
  updateUserLoading: false,
  updateUserError: '',
};

const userReducer = produce((draft, action) => {
  switch (action.type) {
    case SAVE_PHONE:
      draft.profile.phoneNumber = action.payload.phoneNumber;
      break;

    case FETCH_SUGGESTION:
      draft.fetchSuggestionLoading = true;
      draft.fetchSuggestionError = '';
      break;
    case FETCH_SUGGESTION_SUCCEEDED:
      draft.shoePrefixes = action.payload.shoePrefixes;
      draft.slipperPrefixes = action.payload.slipperPrefixes;
      draft.colorCodes = action.payload.colorCodes;
      draft.fetchSuggestionLoading = false;
      draft.fetchSuggestionError = '';
      break;
    case FETCH_SUGGESTION_FAILED:
      draft.fetchSuggestionLoading = false;
      draft.fetchSuggestionError = action.payload;
      break;

    case ADD_SUGGESTION:
      draft.addSuggestionLoading = true;
      draft.addSuggestionError = '';
      break;
    case ADD_SUGGESTION_SUCCEEDED:
      draft.addSuggestionLoading = false;
      draft.addSuggestionError = '';
      draft.shoePrefixes = action.payload.shoePrefixes;
      draft.slipperPrefixes = action.payload.slipperPrefixes;
      draft.colorCodes = action.payload.colorCodes;
      break;
    case ADD_SUGGESTION_FAILED:
      draft.addSuggestionLoading = false;
      draft.addSuggestionError = action.payload;
      break;

    case UPDATE_SUGGESTION:
      draft.updateSuggestionLoading = true;
      draft.updateSuggestionError = '';
      break;
    case UPDATE_SUGGESTION_SUCCEEDED:
      draft.updateSuggestionLoading = false;
      draft.updateSuggestionError = '';
      if (action.payload.shoePrefixes) {
        draft.shoePrefixes = action.payload.shoePrefixes;
      }
      if (action.payload.slipperPrefixes) {
        draft.slipperPrefixes = action.payload.slipperPrefixes;
      }
      if (action.payload.colorCodes) {
        draft.colorCodes = action.payload.colorCodes;
      }
      break;
    case UPDATE_SUGGESTION_FAILED:
      draft.updateSuggestionLoading = false;
      draft.updateSuggestionError = '';
      break;

    case FETCH_USER:
      draft.fetchUserLoading = true;
      draft.fetchUserError = '';
      break;
    case FETCH_USER_SUCCEEDED:
      draft.fetchUserLoading = false;
      draft.fetchUserError = '';
      draft.profile = action.payload.profile;
      draft.favouriteShoes = action.payload.favouriteShoes;
      draft.favouriteSlippers = action.payload.favouriteSlippers;
      draft.rule = action.payload.rule;
      break;
    case FETCH_USER_FAILED:
      draft.fetchUserLoading = false;
      draft.fetchUserError = action.payload;
      break;

    case ADD_NEW_USER:
      draft.addNewUserLoading = true;
      draft.addNewUserError = '';
      break;
    case ADD_NEW_USER_SUCCEEDED:
      draft.addNewUserLoading = false;
      draft.addNewUserError = '';
      draft.profile = action.payload.profile;
      draft.favouriteShoes = action.payload.favouriteShoes;
      draft.favouriteSlippers = action.payload.favouriteSlippers;
      draft.rule = action.payload.rule;
      break;
    case ADD_NEW_USER_FAILED:
      draft.addNewUserLoading = false;
      draft.addNewUserError = action.payload;
      break;

    case UPDATE_USER:
      draft.updateUserLoading = true;
      draft.updateUserError = '';
      break;
    case UPDATE_USER_SUCCEEDED:
      draft.updateUserLoading = false;
      draft.updateUserError = '';
      if (action.payload.profile) {
        draft.profile = action.payload.profile;
      }
      if (action.payload.favouriteShoes) {
        draft.favouriteShoes = action.payload.favouriteShoes;
      }
      if (action.payload.favouriteSlippers) {
        draft.favouriteSlippers = action.payload.favouriteSlippers;
      }
      if (action.payload.rule) {
        draft.rule = action.payload.rule;
      }
      break;
    case UPDATE_USER_FAILED:
      draft.updateUserLoading = false;
      draft.updateUserError = action.payload;
      break;
  }
}, initState);

export default userReducer;
