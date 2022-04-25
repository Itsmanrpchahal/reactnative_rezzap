import produce from 'immer';
import {Action} from '@root/store/categories/actions';
import {ActionType} from '@root/store/categories/actions-types';

interface RepositoriesStateInterface {
  catloading: boolean;
  error: string | null;
  categoryData:any
}

const initialState = {
  catloading: false,
  error: null,
  categoryData: {}
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
      case ActionType.CATEGORIES_INIT:
        draft.catloading = true;
        draft.error = null;
        draft.categoryData={}
        return draft;
      case ActionType.CATEGORIES_SUCCESS:
        draft.catloading = false;
        draft.error = null;
        draft.categoryData = action.payload
        return draft;
      case ActionType.CATEGORIES_ERROR:
        draft.catloading = false;
        draft.error = action.payload;
        draft.categoryData= {}
        return draft;

      default:
        return draft;
    }
  });

export default reducer;
