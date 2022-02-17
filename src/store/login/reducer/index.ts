import produce from 'immer';
import {Action} from '@root/store/login/actions';
import {ActionType} from '@root/store/login/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  access_token: string;
  email_confirmed:string;
  isAuthenticated: boolean;
}

const initialState = {
  loading: false,
  error: null,
  access_token: '',
  email_confirmed:'',
  isAuthenticated: false,
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
      case ActionType.LOGIN:
        draft.loading = true;
        draft.error = null;
        draft.access_token = '';
       draft.email_confirmed ='';
        draft.isAuthenticated = false;
        return draft;
      case ActionType.LOGIN_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.access_token = action.payload.access_token;
        draft.email_confirmed =action.payload.email_confirmed;
        draft.isAuthenticated = true;
        return draft;
      case ActionType.LOGIN_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.access_token = '';
        draft.email_confirmed ='';
        draft.isAuthenticated = false;
        return draft;

      case ActionType.SET_AUTHENTICATION:
        draft.loading = false;
        draft.isAuthenticated = action.payload;
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
