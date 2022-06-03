import produce from 'immer';
import {Action} from '@root/store/uploadPicture/actions';
import {ActionType} from '@root/store/uploadPicture/actions-types';

interface RepositoriesStateInterface {
  picture_loading: boolean;
  error: string | null;
  profilePictureData:any
}

const initialState = {
  picture_loading: false,
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
      case ActionType.UPLOADPICTURE_INIT:
        draft.picture_loading = true;
        draft.error = null;
        draft.profilePictureData={}
        return draft;
      case ActionType.UPLOADPICTURE_SUCCESS:
        draft.picture_loading = false;
        draft.error = null;
        draft.profilePictureData = action.payload
        return draft;
      case ActionType.UPLOADPICTURE_ERROR:
        draft.picture_loading = false;
        draft.error = action.payload;
        draft.profilePictureData= {}
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
