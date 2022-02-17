import produce from 'immer';
import {Action} from '@root/store/interests/actions';
import {ActionType} from '@root/store/interests/actions-types';

interface RepositoriesStateInterface {
  interestLoading: boolean;
  error: string | null;
  myInterestData:any

}

const initialState = {
  interestLoading: false,
  error: null,
  myInterestData: []
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
      case ActionType.MY_INTEREST:
        draft.interestLoading = true;
        draft.error = null;
        draft.myInterestData=[]
        return draft;
      case ActionType.MY_INTEREST_SUCCESS:
        draft.interestLoading = false;
        draft.error = null;
        draft.myInterestData = action.payload
        return draft;
      case ActionType.MY_INTEREST_ERROR:
        draft.interestLoading = false;
        draft.error = action.payload;
        draft.myInterestData= []
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
