import produce from 'immer';
import {Action} from '@root/store/deleteSupporter/actions';
import {ActionType} from '@root/store/deleteSupporter/actions-types';

interface RepositoriesStateInterface {
  deleteloading: boolean;
  error: string | null;
  deleteSupporterData:any

}

const initialState = {
  deleteloading: false,
  error: null,
  deleteSupporterData: []
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
      case ActionType.DELETE_SUPPORTER:
        draft.deleteloading = true;
        draft.error = null;
        draft.deleteSupporterData=[]
        return draft;
      case ActionType.DELETE_SUPPORTER_SUCCESS:
        draft.deleteloading = false;
        draft.error = null;
        draft.deleteSupporterData = action.payload
        return draft;
      case ActionType.DELETE_SUPPORTER_ERROR:
        draft.deleteloading = false;
        draft.error = action.payload;
        draft.deleteSupporterData= []
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
