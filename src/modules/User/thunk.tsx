import {
  addSuggestion,
  addSuggestionSucceeded,
  addSuggestionFailed,
} from './actions';
import { addSuggestionApi } from './apis';

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
