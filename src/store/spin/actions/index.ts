import {ActionType} from '@root/store/spin/actions-types';

interface SpinAction {
  type: ActionType.SPIN_INIT;
}

interface SpinSuccessAction {
  type: ActionType.SPIN__SUCCESS;
  payload:any
}

interface SpinErrorAction {
  type: ActionType.SPIN__ERROR;
  payload: string;
}

export type Action =
  | SpinAction
  | SpinSuccessAction
  | SpinErrorAction
