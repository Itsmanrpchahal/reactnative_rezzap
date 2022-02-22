import {ActionType} from '@root/store/collegeList/actions-types';

interface CollegeListStateAction {
  type: ActionType.COLLEGELIST_STATE_INIT;
}

interface CollegeListStateSuccessAction {
  type: ActionType.COLLEGELIST_STATE_SUCCESS;
  payload:any
}

interface CollegeListStateErrorAction {
  type: ActionType.COLLEGELIST_STATE_ERROR;
  payload: string;
}

export type Action =
  | CollegeListStateAction
  | CollegeListStateSuccessAction
  | CollegeListStateErrorAction
