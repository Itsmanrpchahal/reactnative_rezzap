import {ActionType} from '@root/store/addSupporter/actions-types';

interface AddSupporterAction {
  type: ActionType.ADD_SUPPORTER;
}

interface AddSupporterSuccessAction {
  type: ActionType.ADD_SUPPORTER_SUCCESS;
  payload:any
}

interface AddSupporterErrorAction {
  type: ActionType.ADD_SUPPORTER_ERROR;
  payload: string;
}

export type Action =
  | AddSupporterAction
  | AddSupporterSuccessAction
  | AddSupporterErrorAction
