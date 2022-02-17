import {Dispatch} from 'redux';
import {ActionType} from '@root/store/supportUnsupport/actions-types';
import {Action} from '@root/store/supportUnsupport/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const setsupport = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {

  
    dispatch({
      type: ActionType.SUPPORT_UNSUPPORT_INIT,
    });

    try {
      const response =  await service.post(apiUri.supportUnsupportapi ,fn);

      dispatch({
        type: ActionType.SUPPORT_UNSUPPORT_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.SUPPORT_UNSUPPORT_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

