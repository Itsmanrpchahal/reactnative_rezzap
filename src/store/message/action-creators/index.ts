import {Dispatch} from 'redux';
import {ActionType} from '@root/store/message/actions-types';
import {Action} from '@root/store/message/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const getMessageList = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MESSAGE_INIT,
    });

    try {
      const response =  await service.get(apiUri.messageList);

      dispatch({
        type: ActionType.MESSAGE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MESSAGE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};


export const getMessageDetail = (id:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MESSAGE_INIT,
    });

    try {
      const response =  await service.get(apiUri.messageDetail+id);

      dispatch({
        type: ActionType.MESSAGE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MESSAGE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const sendMessage = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MESSAGE_INIT,
    });

    try {
      const response =  await service.post(apiUri.sendMessage,fn);

      dispatch({
        type: ActionType.MESSAGE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MESSAGE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const searchSupporter = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MESSAGE_INIT,
    });

    try {
      const response =  await service.get(apiUri.searchSupporter+fn);

      dispatch({
        type: ActionType.MESSAGE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MESSAGE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
