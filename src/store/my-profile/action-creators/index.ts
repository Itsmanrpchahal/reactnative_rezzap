import {Dispatch} from 'redux';
import {ActionType} from '@root/store/my-profile/actions-types';
import {Action} from '@root/store/my-profile/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { ProfileInterface } from "../interfaces";
import { useActions } from "../../../hooks/useActions";


export const getMyProfile = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_PROFILE,
    });

    try {
      const response = await service.get(apiUri.myProfile);

      dispatch({
        type: ActionType.MY_PROFILE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MY_PROFILE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};



/**
 *
 * @param data
 */
export const getSupporterProfile = (fn:ProfileInterface) => {

  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_PROFILE,
    });

    try {
      const response = await service.get(apiUri.supporterProfile+fn.supporter_id);

      dispatch({
        type: ActionType.MY_PROFILE_SUCCESS,
        payload: response.data,
      });

      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MY_PROFILE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
