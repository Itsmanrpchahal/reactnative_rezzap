import {ActionType} from '@root/store/resume/actions-types';

interface ResumeAction {
  type: ActionType.RESUME_INIT;
}

interface ResumeSuccessAction {
  type: ActionType.RESUME_SUCCESS;
  payload:any
}

interface ResumeErrorAction {
  type: ActionType.RESUME_ERROR;
  payload: string;
}

export type Action =
  | ResumeAction
  | ResumeSuccessAction
  | ResumeErrorAction
