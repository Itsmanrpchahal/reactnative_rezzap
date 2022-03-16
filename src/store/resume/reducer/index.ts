import produce from 'immer';
import {Action} from '@root/store/resume/actions';
import {ActionType} from '@root/store/resume/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  resumeData:any

}

const initialState = {
  loading: false,
  error: null,
  resumeData: {}
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
      case ActionType.RESUME_INIT:
        draft.loading = true;
        draft.error = null;
        draft.resumeData={}
        return draft;
      case ActionType.RESUME_SUCCESS:
        action.payload.data.reverse()
        draft.loading = false;
        draft.error = null;
        draft.resumeData =  action.payload;
        return draft;
      case ActionType.RESUME_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.resumeData= {}
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
