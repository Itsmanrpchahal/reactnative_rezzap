import produce from 'immer';
import {Action} from '@root/store/supportUnsupport/actions';
import {ActionType} from '@root/store/supportUnsupport/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  supportUnsupportData:any

}

const initialState = {
  loading: false,
  error: null,
  supportUnsupportData: {}
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
      case ActionType.SUPPORT_UNSUPPORT_INIT:
        draft.loading = true;
        draft.error = null;
        draft.supportUnsupportData={}
        return draft;
      case ActionType.SUPPORT_UNSUPPORT_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.supportUnsupportData = action.payload
        return draft;
      case ActionType.SUPPORT_UNSUPPORT_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.supportUnsupportData= {}
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
