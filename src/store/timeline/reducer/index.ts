import produce from 'immer';
import {Action} from '@root/store/timeline/actions';
import {ActionType} from '@root/store/timeline/actions-types';

interface RepositoriesStateInterface {
  timelineLoading: boolean;
  error: string | null;
  timelineData:any

}

const initialState = {
  timelineLoading: false,
  error: null,
  timelineData: []
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
      case ActionType.TIMELINE_INIT:
        draft.timelineLoading = true;
        draft.error = null;
        draft.timelineData=[]
        return draft;
      case ActionType.TIMELINE_SUCCESS:
       // action.payload.data.reverse()
        draft.timelineLoading = false;
        draft.error = null;
        draft.timelineData = action.payload
        return draft;
      case ActionType.TIMELINE_ERROR:
        draft.timelineLoading = false;
        draft.error = action.payload;
        draft.timelineData= []
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
