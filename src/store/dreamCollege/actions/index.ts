import {ActionType} from '@root/store/dreamCollege/actions-types';

interface DreamCollegetStateAction {
  type: ActionType.DREAMCOLLEGE_STATE_INIT;
}

interface DreamCollegeStateSuccessAction {
  type: ActionType.DREAMCOLLEGE_STATE_SUCCESS;
  payload:any
}

interface DreamCollegeStateErrorAction {
  type: ActionType.DREAMCOLLEGE_STATE_ERROR;
  payload: string;
}

export type Action =
  | DreamCollegetStateAction
  | DreamCollegeStateSuccessAction
  | DreamCollegeStateErrorAction
