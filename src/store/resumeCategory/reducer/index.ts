import produce from 'immer';
import {Action} from '@root/store/resumeCategory/actions';
import {ActionType} from '@root/store/resumeCategory/actions-types';

interface RepositoriesStateInterface {
  loadingC: boolean;
  error: string | null;
  resumeCData:any

}

const initialState = {
  loadingC: false,
  error: null,
  resumeCData: []
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
      case ActionType.RESUME_CATEGORY_INIT:
        draft.loadingC = true;
        draft.error = null;
        draft.resumeCData=[]
        return draft;
      case ActionType.RESUME_CATEGORY_SUCCESS:
        draft.loadingC = false;
        draft.error = null;
        draft.resumeCData = action.payload
        return draft;
      case ActionType.RESUME_CATEGORY_ERROR:
        draft.loadingC = false;
        draft.error = action.payload;
        draft.resumeCData= []
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
