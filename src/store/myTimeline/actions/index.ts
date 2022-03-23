import {ActionType} from '@root/store/myTimeline/actions-types';

interface MyTimelineAction {
  type: ActionType.MYTIMELINE_INIT;
}

interface MyTimelineSuccessAction {
  type: ActionType.MYTIMELINE_SUCCESS;
  payload:any
}

interface MyTimelineErrorAction {
  type: ActionType.MYTIMELINE_ERROR;
  payload: string;
}

export type Action =
  | MyTimelineAction
  | MyTimelineSuccessAction
  | MyTimelineErrorAction
