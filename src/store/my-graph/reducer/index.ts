import produce from 'immer';
import {Action} from '@root/store/my-graph/actions';
import {ActionType} from '@root/store/my-graph/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  myGraphData:any

}

const initialState = {
  loading: false,
  error: null,
  myGraphData: {}
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
      case ActionType.MY_GRAPH:
        draft.loading = true;
        draft.error = null;
        draft.myGraphData={}
        return draft;
      case ActionType.MY_GRAPH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.myGraphData = action.payload
        return draft;
      case ActionType.MY_GRAPH_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.myGraphData= {}
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
