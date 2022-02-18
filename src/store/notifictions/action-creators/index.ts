import {Dispatch} from 'redux';
import {ActionType} from '@root/store/notifictions/actions-types';
import {Action} from '@root/store/notifictions/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const getNotifications = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.NOTIFICATIONS_INIT,
    });

    try {
      const response =  await service.get(apiUri.notifications);

      dispatch({
        type: ActionType.NOTIFICATIONS_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.NOTIFICATIONS_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};


export const clear_Notificatins = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.NOTIFICATIONS_INIT,
    });

    try {
      const response =  await service.delete(apiUri.clearNotificatins);

      dispatch({
        type: ActionType.NOTIFICATIONS_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.NOTIFICATIONS_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

