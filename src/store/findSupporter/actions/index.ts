import {ActionType} from '@root/store/findSupporter/actions-types';

interface FindSupporterAction {
  type: ActionType.FIND_SUPPORTER;
}

interface FindSupporterSuccessAction {
  type: ActionType.FIND_SUPPORTER_SUCCESS;
  payload:any
}

interface FindSupporterErrorAction {
  type: ActionType.FIND_SUPPORTER_ERROR;
  payload: string;
}

export type Action =
  | FindSupporterAction
  | FindSupporterSuccessAction
  | FindSupporterErrorAction
