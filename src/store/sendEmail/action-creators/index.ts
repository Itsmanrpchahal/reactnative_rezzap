import { Dispatch } from 'redux';
import { ActionType } from '@root/store/sendEmail/actions-types';
import { Action } from '@root/store/sendEmail/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import Snackbar from 'react-native-snackbar';


export const send_Email = (fn: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.SEND_EMAIL_INIT,
    });

    try {
      const response = await service.post(apiUri.sendemail + fn.email);

        dispatch({
          type: ActionType.SEND_EMAIL_SUCCESS,
          payload: response,
        });
      
      return response;
    } catch (e: any) {
     
      dispatch({
        type: ActionType.SEND_EMAIL_ERROR,
        payload: e.response.data.status,
      });
    }
  };
};

export const reset_Password = (fn: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.SEND_EMAIL_INIT,
    });

    try {
      const response = await service.post(apiUri.resetPassword+"email="+fn.email+"&otp="+fn.otp+"&password="+fn.password);

        dispatch({
          type: ActionType.SEND_EMAIL_SUCCESS,
          payload: response,
        });
      
      return response;
    } catch (e: any) {
     
      dispatch({
        type: ActionType.SEND_EMAIL_ERROR,
        payload: e.response.data.status,
      });
    }
  };
};
