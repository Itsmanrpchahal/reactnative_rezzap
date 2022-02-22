import {ActionType} from '@root/store/allCollegeList/actions-types';

interface AllCollegeAction {
  type: ActionType.ALL_COLLEGE_INIT;
}

interface AllCollegeSuccessAction {
  type: ActionType.ALL_COLLEGE_SUCCESS;
  payload:any
}

interface AllCollegeErrorAction {
  type: ActionType.ALL_COLLEGE_ERROR;
  payload: string;
}

export type Action =
  | AllCollegeAction
  | AllCollegeSuccessAction
  | AllCollegeErrorAction
