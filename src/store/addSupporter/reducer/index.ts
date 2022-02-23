import produce from 'immer';
import {Action} from '@root/store/addSupporter/actions';
import {ActionType} from '@root/store/addSupporter/actions-types';

interface RepositoriesStateInterface {
  addloading: boolean;
  error: string | null;
  addSupporterData:any

}

const initialState = {
  addloading: false,
  error: null,
  addSupporterData: []
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
      case ActionType.ADD_SUPPORTER:
        draft.addloading = true;
        draft.error = null;
        draft.addSupporterData=[]
        return draft;
      case ActionType.ADD_SUPPORTER_SUCCESS:
        draft.addloading = false;
        draft.error = null;
        draft.addSupporterData = action.payload
        return draft;
      case ActionType.ADD_SUPPORTER_ERROR:
        draft.addloading = false;
        draft.error = action.payload;
        draft.addSupporterData= []
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
