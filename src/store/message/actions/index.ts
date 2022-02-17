import {ActionType} from '@root/store/message/actions-types';

interface MessageAction {
  type: ActionType.MESSAGE_INIT;
}

interface MessageSuccessAction {
  type: ActionType.MESSAGE_SUCCESS;
  payload:any
}

interface MessageErrorAction {
  type: ActionType.MESSAGE_ERROR;
  payload: string;
}

export type Action =
  | MessageAction
  | MessageSuccessAction
  | MessageErrorAction
