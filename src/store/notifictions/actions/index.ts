import {ActionType} from '@root/store/notifictions/actions-types';

interface NotificationsAction {
  type: ActionType.RESUME_INIT;
}

interface NotificationsSuccessAction {
  type: ActionType.RESUME_SUCCESS;
  payload:any
}

interface NotificationsErrorAction {
  type: ActionType.RESUME_ERROR;
  payload: string;
}

export type Action =
  | NotificationsAction
  | NotificationsSuccessAction
  | NotificationsErrorAction
