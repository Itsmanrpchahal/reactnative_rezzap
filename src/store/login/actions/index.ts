import {ActionType} from '@root/store/login/actions-types';

interface LoginAction {
  type: ActionType.LOGIN;
}

interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
  payload: LoginSuccessResponseObject;
}

interface LoginSuccessResponseObject {
  access_token: string;
  email_confirmed: string;
}

interface LoginErrorAction {
  type: ActionType.LOGIN_ERROR;
  payload: string;
}

interface SetAuthentication {
  type: ActionType.SET_AUTHENTICATION;
  payload: boolean;
}


export type Action =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | SetAuthentication
