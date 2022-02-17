import produce from 'immer';
import {Action} from '@root/store/my-profile/actions';
import {ActionType} from '@root/store/my-profile/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  myProfileData:any

}

const initialState = {
  loading: false,
  error: null,
  myProfileData: null
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
      case ActionType.MY_PROFILE:
        draft.loading = true;
        draft.error = null;
        draft.myProfileData=null
        return draft;
      case ActionType.MY_PROFILE_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.myProfileData = action.payload
        return draft;
      case ActionType.MY_PROFILE_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.myProfileData= null
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
