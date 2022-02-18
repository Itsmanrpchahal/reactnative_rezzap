import produce from 'immer';
import {Action} from '@root/store/notifictions/actions';
import {ActionType} from '@root/store/notifictions/actions-types';

interface RepositoriesStateInterface {
  loading: boolean;
  error: string | null;
  notificationsData:any

}

const initialState = {
  loading: false,
  error: null,
  notificationsData: []
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
      case ActionType.NOTIFICATIONS_INIT:
        draft.loading = true;
        draft.error = null;
        draft.notificationsData=[]
        return draft;
      case ActionType.NOTIFICATIONS_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.notificationsData = action.payload
        return draft;
      case ActionType.NOTIFICATIONS_ERROR:
        draft.loading = false;
        draft.error = action.payload;
        draft.notificationsData= []
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
