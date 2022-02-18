import {ActionType} from '@root/store/follow_unfollow/actions-types';

interface FollowUnfollowAction {
  type: ActionType.FOLLOW_UNFOLLOW_INIT;
}

interface FollowUnfollowSuccessAction {
  type: ActionType.FOLLOW_UNFOLLOW_SUCCESS;
  payload:any
}

interface FollowUnfollowErrorAction {
  type: ActionType.FOLLOW_UNFOLLOW_ERROR;
  payload: string;
}

export type Action =
  | FollowUnfollowAction
  | FollowUnfollowSuccessAction
  | FollowUnfollowErrorAction
