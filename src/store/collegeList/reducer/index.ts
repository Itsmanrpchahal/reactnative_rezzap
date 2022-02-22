import produce from 'immer';
import {Action} from '@root/store/collegeList/actions';
import {ActionType} from '@root/store/collegeList/actions-types';

interface RepositoriesStateInterface {
  collegeloading: boolean;
  error: string | null;
  collegeListData:any

}

const initialState = {
  collegeloading: false,
  error: null,
  collegeListData: []
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
      case ActionType.COLLEGELIST_STATE_INIT:
        draft.collegeloading = true;
        draft.error = null;
        draft.collegeListData=[]
        return draft;
      case ActionType.COLLEGELIST_STATE_SUCCESS:
        draft.collegeloading = false;
        draft.error = null;
        draft.collegeListData = action.payload
        return draft;
      case ActionType.COLLEGELIST_STATE_ERROR:
        draft.collegeloading = false;
        draft.error = action.payload;
        draft.collegeListData= []
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
