import {ActionType} from '@root/store/resumeActivity/actions-types';

interface Resume_Activity_Action {
  type: ActionType.RESUME_ACTIVITY_INIT;
}

interface Resume_Activity_SuccessAction {
  type: ActionType.RESUME_ACTIVITY_SUCCESS;
  payload:any
}

interface Resume_Activity_ErrorAction {
  type: ActionType.RESUME_ACTIVITY_ERROR;
  payload: string;
}

export type Action =
  | Resume_Activity_Action
  | Resume_Activity_SuccessAction
  | Resume_Activity_ErrorAction
