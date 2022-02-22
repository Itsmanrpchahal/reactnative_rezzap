import produce from 'immer';
import {Action} from '@root/store/college/actions';
import {ActionType} from '@root/store/college/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  collegeStateData:any

}

const initialState = {
  loading: false,
  error: null,
  collegeStateData: []
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
      case ActionType.COLLEGE_STATE_INIT:
        draft.loading = true;
        draft.error = null;
        draft.collegeStateData=[]
        return draft;
      case ActionType.COLLEGE_STATE_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.collegeStateData = action.payload
        return draft;
      case ActionType.COLLEGE_STATE_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.collegeStateData= []
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
