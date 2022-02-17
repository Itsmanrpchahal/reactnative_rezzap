import produce from 'immer';
import {Action} from '@root/store/spin/actions';
import {ActionType} from '@root/store/spin/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  profilePictureData:any

}

const initialState = {
  loading: false,
  error: null,
  profilePictureData: {}
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
      case ActionType.SPIN_INIT:
        draft.loading = true;
        draft.error = null;
        draft.profilePictureData={}
        return draft;
      case ActionType.SPIN__SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.profilePictureData = action.payload
        return draft;
      case ActionType.SPIN__ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.profilePictureData= {}
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
