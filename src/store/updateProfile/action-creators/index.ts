import {Dispatch} from 'redux';
import {ActionType} from '@root/store/updateProfile/actions-types';
import {Action} from '@root/store/updateProfile/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {  UpdateProfileInterface } from "../interfaces";


export const updateMyProfile = (fn : any) => {

  console.log('UPDATE PROFILE DATA ====>  ',fn)
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.UPDATE_PROFILE,
    });

    try {
      const response = await service.post(apiUri.updateProfile,fn,);

      dispatch({
        type: ActionType.UPDATE_PROFILE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.UPDATE_PROFILE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};



