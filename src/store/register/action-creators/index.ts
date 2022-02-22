import {Dispatch} from 'redux';
import {ActionType} from '@root/store/register/actions-types';
import {Action} from '@root/store/register/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { SignUpInterface } from "../../login/interfaces";

/**
 *
 * @param data
 */
export const signUp = (data: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.SIGNUP,
    });
    try {
      const response = await service.post(apiUri.auth.register, data,{
        headers: {
          'Accept': 'application/json',
        },
      },);

      dispatch({
        type: ActionType.SIGNUP_SUCCESS,
        payload: response,
      });

      
      return response.data;
    } catch (e: any) {
      console.log('Register Error ===?  ',e)
      dispatch({
        type: ActionType.SIGNUP_ERROR,
        payload: e,
      });
    }
  };
};
