import produce from 'immer';
import {Action} from '@root/store/dreamCollege/actions';
import {ActionType} from '@root/store/dreamCollege/actions-types';

interface RepositoriesStateInterface {
  dreamloading: boolean;
  error: string | null;
  dreamCollegeData:any

}

const initialState = {
  dreamloading: false,
  error: null,
  dreamCollegeData: []
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
      case ActionType.DREAMCOLLEGE_STATE_INIT:
        draft.dreamloading = true;
        draft.error = null;
        draft.dreamCollegeData=[]
        return draft;
      case ActionType.DREAMCOLLEGE_STATE_SUCCESS:
        draft.dreamloading = false;
        draft.error = null;
        draft.dreamCollegeData = action.payload
        return draft;
      case ActionType.DREAMCOLLEGE_STATE_ERROR:
        draft.dreamloading = false;
        draft.error = action.payload;
        draft.dreamCollegeData= []
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
