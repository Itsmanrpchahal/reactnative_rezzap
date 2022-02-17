import {ActionType} from '@root/store/my-profile/actions-types';

interface MyProfileAction {
  type: ActionType.MY_PROFILE;
}

interface MyProfileSuccessAction {
  type: ActionType.MY_PROFILE_SUCCESS;
  payload:any
}

interface MyProfileErrorAction {
  type: ActionType.MY_PROFILE_ERROR;
  payload: string;
}

export type Action =
  | MyProfileAction
  | MyProfileSuccessAction
  | MyProfileErrorAction
