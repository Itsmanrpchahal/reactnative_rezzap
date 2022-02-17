import {ActionType} from '@root/store/timeline/actions-types';

interface TimelineAction {
  type: ActionType.TIMELINE_INIT;
}

interface TimelineSuccessAction {
  type: ActionType.TIMELINE_SUCCESS;
  payload:any
}

interface TimelineErrorAction {
  type: ActionType.TIMELINE_ERROR;
  payload: string;
}

export type Action =
  | TimelineAction
  | TimelineSuccessAction
  | TimelineErrorAction
