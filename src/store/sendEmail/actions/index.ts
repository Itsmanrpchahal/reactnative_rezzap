import {ActionType} from '@root/store/sendEmail/actions-types';

interface SendEmailAction {
  type: ActionType.SEND_EMAIL_INIT;
}

interface SendEmailSuccessAction {
  type: ActionType.SEND_EMAIL_SUCCESS;
  payload:any
}

interface SendEmailErrorAction {
  type: ActionType.SEND_EMAIL_ERROR;
  payload: string;
}

export type Action =
  | SendEmailAction
  | SendEmailSuccessAction
  | SendEmailErrorAction
