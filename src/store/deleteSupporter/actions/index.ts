import {ActionType} from '@root/store/deleteSupporter/actions-types';

interface DeleteSupporterAction {
  type: ActionType.DELETE_SUPPORTER;
}

interface DeleteSupporterSuccessAction {
  type: ActionType.DELETE_SUPPORTER_SUCCESS;
  payload:any
}

interface DeleteSupporterErrorAction {
  type: ActionType.DELETE_SUPPORTER_ERROR;
  payload: string;
}

export type Action =
  | DeleteSupporterAction
  | DeleteSupporterSuccessAction
  | DeleteSupporterErrorAction
