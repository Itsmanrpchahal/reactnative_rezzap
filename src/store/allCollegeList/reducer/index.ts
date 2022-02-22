import produce from 'immer';
import {Action} from '@root/store/allCollegeList/actions';
import {ActionType} from '@root/store/allCollegeList/actions-types';

interface RepositoriesStateInterface {
  allCollegeloading: boolean;
  error: string | null;
  allcollegeData:any

}

const initialState = {
  allCollegeloading: false,
  error: null,
  allcollegeData: []
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
      case ActionType.ALL_COLLEGE_INIT:
        draft.allCollegeloading = true;
        draft.error = null;
        draft.allcollegeData=[]
        return draft;
      case ActionType.ALL_COLLEGE_SUCCESS:
        draft.allCollegeloading = false;
        draft.error = null;
        draft.allcollegeData = action.payload
        return draft;
      case ActionType.ALL_COLLEGE_ERROR:
        draft.allCollegeloading = false;
        draft.error = action.payload;
        draft.allcollegeData= []
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
