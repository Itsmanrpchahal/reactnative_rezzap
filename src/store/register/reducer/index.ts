import produce from 'immer';
import {Action} from '@root/store/register/actions';
import {ActionType} from '@root/store/register/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  signUpData : any;
}

const initialState = {
  loading: false,
  error: null,
  signUpData : {}
};

/**
 * @param state
 * @param action
 */
const reducer = (
  state: RepositoriesStateInterface = initialState,
  action: Action,
): RepositoriesStateInterface =>
  produce(state, draft => {
    switch (action.type) {
      case ActionType.SIGNUP:
        draft.loading = true;
        draft.error = null;
        draft.signUpData = {}
        return draft;
      case ActionType.SIGNUP_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.signUpData = action.payload
        return draft;
      case ActionType.SIGNUP_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.signUpData = {}
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
