import {ActionType} from '@root/store/college/actions-types';

interface CollegeStateAction {
  type: ActionType.COLLEGE_STATE_INIT;
}

interface CollegeStateSuccessAction {
  type: ActionType.COLLEGE_STATE_SUCCESS;
  payload:any
}

interface CollegeStateErrorAction {
  type: ActionType.COLLEGE_STATE_ERROR;
  payload: string;
}

export type Action =
  | CollegeStateAction
  | CollegeStateSuccessAction
  | CollegeStateErrorAction
