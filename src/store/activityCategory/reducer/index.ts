import produce from 'immer';
import {Action} from '@root/store/activityCategory/actions';
import {ActionType} from '@root/store/activityCategory/actions-types';

interface RepositoriesStateInterface {
  activity_catloading: boolean;
  error: string | null;
  activity_categoryData:any
}

const initialState = {
  activity_catloading: false,
  error: null,
  activity_categoryData: []
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
      case ActionType.ACTIVITY_CATEGORIES_INIT:
        draft.activity_catloading = true;
        draft.error = null;
        draft.activity_categoryData=[]
        return draft;
      case ActionType.ACTIVITY_CATEGORIES_SUCCESS:
        draft.activity_catloading = false;
        draft.error = null;
        draft.activity_categoryData = action.payload
        return draft;
      case ActionType.ACTIVITY_CATEGORIES_ERROR:
        draft.activity_catloading = false;
        draft.error = action.payload;
        draft.activity_categoryData= []
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
