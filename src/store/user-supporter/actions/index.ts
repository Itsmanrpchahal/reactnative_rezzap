import {ActionType} from '@root/store/user-supporter/actions-types';

interface MySupporterAction {
  type: ActionType.MY_SUPPORTER;
}

interface MySupporterSuccessAction {
  type: ActionType.MY_SUPPORTER_SUCCESS;
  payload:any
}

interface MySupporterErrorAction {
  type: ActionType.MY_SUPPORTER_ERROR;
  payload: string;
}

export type Action =
  | MySupporterAction
  | MySupporterSuccessAction
  | MySupporterErrorAction
