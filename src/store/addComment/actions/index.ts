import {ActionType} from '@root/store/addComment/actions-types';

interface AddCommentAction {
  type: ActionType.ADD_COMMENT_INIT;
}

interface AddCommentSuccessAction {
  type: ActionType.ADD_COMMENT_SUCCESS;
  payload:any
}

interface AddCommentErrorAction {
  type: ActionType.ADD_COMMENT_ERROR;
  payload: string;
}

export type Action =
  | AddCommentAction
  | AddCommentSuccessAction
  | AddCommentErrorAction
