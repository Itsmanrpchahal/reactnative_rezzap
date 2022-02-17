import {Dispatch} from 'redux';
import {ActionType} from '@root/store/user-supporter/actions-types';
import {Action} from '@root/store/user-supporter/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {  SupporterInterface } from "../interface";


export const getMySupporter = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_SUPPORTER,
    });

    try {
      const response = await service.get(apiUri.mySupporter);

      dispatch({
        type: ActionType.MY_SUPPORTER_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MY_SUPPORTER_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

/**
 *
 * @param data
 */
export const getSupporterSupporterList = (fn :SupporterInterface) => {

  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_SUPPORTER,
    });

    try {
      const response = await service.get(apiUri.supportersSupporterList+fn.supporter_id);

      dispatch({
        type: ActionType.MY_SUPPORTER_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MY_SUPPORTER_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};




