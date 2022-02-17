import produce from 'immer';
import {Action} from '@root/store/spin/actions';
import {ActionType} from '@root/store/spin/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  spinData:any

}

const initialState = {
  loading: false,
  error: null,
  spinData: []
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
      case ActionType.SPIN_INIT:
        draft.loading = true;
        draft.error = null;
        draft.spinData=[]
        return draft;
      case ActionType.SPIN__SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.spinData = action.payload
        return draft;
      case ActionType.SPIN__ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.spinData= []
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
