import produce from 'immer';
import {Action} from '@root/store/resumeActivity/actions';
import {ActionType} from '@root/store/resumeActivity/actions-types';

interface RepositoriesStateInterface {
  resumeActivityloading: boolean;
  error: string | null;
  resumeActivityData:any

}

const initialState = {
  resumeActivityloading: false,
  error: null,
  resumeActivityData: []
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
      case ActionType.RESUME_ACTIVITY_INIT:
        draft.resumeActivityloading = true;
        draft.error = null;
        draft.resumeActivityData=[]
        return draft;
      case ActionType.RESUME_ACTIVITY_SUCCESS:
        draft.resumeActivityloading = false;
        draft.error = null;
        draft.resumeActivityData = action.payload
        return draft;
      case ActionType.RESUME_ACTIVITY_ERROR:
        draft.resumeActivityloading = false;
        draft.error = action.payload;
        draft.resumeActivityData= []
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
