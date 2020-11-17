import { parseSync } from '@babel/core';
import produce from 'immer';
import { userReducerTypes } from '~/@types';

import {
  SAVE_PHONE,
  ADD_SUGGESTION,
  ADD_SUGGESTION_SUCCEEDED,
  ADD_SUGGESTION_FAILED,
  UPDATE_SUGGESTION,
  UPDATE_SUGGESTION_SUCCEEDED,
  UPDATE_SUGGESTION_FAILED,
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
  addSuggestionLoading: false,
  addSuggestionError: '',
  updateSuggestionLoading: false,
  updateSuggestionError: '',
};

const userReducer = produce((draft, action) => {
  switch (action.type) {
    case SAVE_PHONE:
      draft.profile.phoneNumber = action.payload.phoneNumber;
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
  }
}, initState);

export default userReducer;
