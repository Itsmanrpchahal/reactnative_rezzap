import produce from 'immer';
import {Action} from '@root/store/sendEmail/actions';
import {ActionType} from '@root/store/sendEmail/actions-types';

interface RepositoriesStateInterface {
  sendEmailloading: boolean;
  sendEmailerror: string | null;
  sendEmailData:any

}

const initialState = {
  sendEmailloading: false,
  sendEmailerror: null,
  sendEmailData: []
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
      case ActionType.SEND_EMAIL_INIT:
        draft.sendEmailloading = true;
        draft.sendEmailerror = null;
        draft.sendEmailData=[]
        return draft;
      case ActionType.SEND_EMAIL_SUCCESS:
        draft.sendEmailloading = false;
        draft.sendEmailerror = null;
        draft.sendEmailData = action.payload
        return draft;
      case ActionType.SEND_EMAIL_ERROR:
        draft.sendEmailloading = false;
        draft.sendEmailerror = action.payload;
        draft.sendEmailData= []
        return draft;


      default:
        return draft;
    }
  });

export default reducer;
