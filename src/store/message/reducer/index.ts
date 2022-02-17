import produce from 'immer';
import {Action} from '@root/store/message/actions';
import {ActionType} from '@root/store/message/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  messageListData:any

}

const initialState = {
  loading: false,
  error: null,
  messageListData: {}
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
      case ActionType.MESSAGE_INIT:
        draft.loading = true;
        draft.error = null;
        draft.messageListData={}
        return draft;
      case ActionType.MESSAGE_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.messageListData = action.payload
        return draft;
      case ActionType.MESSAGE_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.messageListData= {}
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
