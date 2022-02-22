import produce from 'immer';
import {Action} from '@root/store/findSupporter/actions';
import {ActionType} from '@root/store/findSupporter/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  findSupporterData:any

}

const initialState = {
  loading: false,
  error: null,
  findSupporterData: []
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
      case ActionType.FIND_SUPPORTER:
        draft.loading = true;
        draft.error = null;
        draft.findSupporterData=[]
        return draft;
      case ActionType.FIND_SUPPORTER_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.findSupporterData = action.payload
        return draft;
      case ActionType.FIND_SUPPORTER_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.findSupporterData= []
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
