import {ActionType} from '@root/store/interests/actions-types';

interface MyInterestAction {
  type: ActionType.MY_INTEREST;
}

interface MyInterestSuccessAction {
  type: ActionType.MY_INTEREST_SUCCESS;
  payload:any
}

interface MyInterestErrorAction {
  type: ActionType.MY_INTEREST_ERROR;
  payload: string;
}

export type Action =
  | MyInterestAction
  | MyInterestSuccessAction
  | MyInterestErrorAction
