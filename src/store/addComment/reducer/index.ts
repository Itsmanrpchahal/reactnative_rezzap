import produce from 'immer';
import {Action} from '@root/store/addComment/actions';
import {ActionType} from '@root/store/addComment/actions-types';

interface RepositoriesStateInterface {
  commentloading: boolean;
  error: string | null;
  addCommemtData:any

}

const initialState = {
  commentloading: false,
  error: null,
  addCommemtData: {}
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
      case ActionType.ADD_COMMENT_INIT:
        draft.commentloading = true;
        draft.error = null;
        draft.addCommemtData={}
        return draft;
      case ActionType.ADD_COMMENT_SUCCESS:
        draft.commentloading = false;
        draft.error = null;
        draft.addCommemtData = action.payload
        return draft;
      case ActionType.ADD_COMMENT_ERROR:
        draft.commentloading = false;
        draft.error = action.payload;
        draft.addCommemtData= {}
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
