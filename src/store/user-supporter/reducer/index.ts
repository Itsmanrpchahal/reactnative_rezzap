import produce from 'immer';
import {Action} from '@root/store/user-supporter/actions';
import {ActionType} from '@root/store/user-supporter/actions-types';

interface RepositoriesStateInterface {
  supporterLoading: boolean;
  error: string | null;
  mySupporterData:any

}

const initialState = {
  supporterLoading: false,
  error: null,
  mySupporterData: []
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
      case ActionType.MY_SUPPORTER:
        draft.supporterLoading = true;
        draft.error = null;
        draft.mySupporterData=[]
        return draft;
      case ActionType.MY_SUPPORTER_SUCCESS:
        draft.supporterLoading = false;
        draft.error = null;
        draft.mySupporterData = action.payload
        return draft;
      case ActionType.MY_SUPPORTER_ERROR:
        draft.supporterLoading = false;
        draft.error = action.payload;
        draft.mySupporterData= []
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
