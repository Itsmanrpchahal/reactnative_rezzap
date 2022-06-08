import produce from 'immer';
import {Action} from '@root/store/myTimeline/actions';
import {ActionType} from '@root/store/myTimeline/actions-types';

interface RepositoriesStateInterface {
  mytimelineLoading: boolean;
  error: string | null;
  mytimelineData:any

}

const initialState = {
  mytimelineLoading: false,
  error: null,
  mytimelineData: []
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
      case ActionType.MYTIMELINE_INIT:
        draft.mytimelineLoading = true;
        draft.error = null;
        draft.mytimelineData=[]
        return draft;
      case ActionType.MYTIMELINE_SUCCESS:
        
        draft.mytimelineLoading = false;
        draft.error = null;
        draft.mytimelineData = action.payload
        return draft;
      case ActionType.MYTIMELINE_ERROR:
        draft.mytimelineLoading = false;
        draft.error = action.payload;
        draft.mytimelineData= []
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
