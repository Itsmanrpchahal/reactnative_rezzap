import produce from 'immer';
import {Action} from '@root/store/updateProfile/actions';
import {ActionType} from '@root/store/updateProfile/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  updatedProfileData:any

}

const initialState = {
  loading: false,
  error: null,
  updatedProfileData: null
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
      case ActionType.UPDATE_PROFILE:
        draft.loading = true;
        draft.error = null;
        draft.updatedProfileData=null
        return draft;
      case ActionType.UPDATE_PROFILE_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.updatedProfileData = action.payload
        return draft;
      case ActionType.UPDATE_PROFILE_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.updatedProfileData= null
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
