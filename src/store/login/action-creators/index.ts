import {Dispatch} from 'redux';
import {ActionType} from '@root/store/login/actions-types';
import {Action} from '@root/store/login/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service, {setAuthInitalToken} from '@root/service/axios';
import {storeData} from 'storage';
import {storageConstants} from '@root/storage/storage-constants';
import { LoginInterface, LoginResponseInterface } from "../interfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @param data
 */
export const login = (data: LoginInterface) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.LOGIN,
    });
    try {
      const response = await service.post(apiUri.auth.login, data);
      setAuthInitalToken(response.data.data.access_token);
      await storeData(storageConstants.access_token, response.data.data.access_token);

      AsyncStorage.setItem('TOKEN', response.data.data.access_token)
      AsyncStorage.setItem('EMAIL_CONFIRMED', response.data.email_confirmed)
     await dispatch(
        setUser({
          access_token: response.data.data.access_token,
          email_confirmed : response.data.email_confirmed
        }),
      );
      dispatch(setAuthentication(true));
      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.LOGIN_ERROR,
        payload: 'Invalid email/password',
      });
    }
  };
};

/**
 * @param value
 */
export const setAuthentication = (value: boolean) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_AUTHENTICATION,
      payload: value,
    });
  };
};

/**
 *
 */
export const setUser = (fn: LoginResponseInterface) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN_SUCCESS,
      payload: {
        access_token: fn.access_token,
        email_confirmed :fn.email_confirmed,
      },
    });
  };
};
function alert(accessToken: any) {
    throw new Error('Function not implemented.');
}

