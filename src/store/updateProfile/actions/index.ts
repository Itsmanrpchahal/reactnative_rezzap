import {ActionType} from '@root/store/updateProfile/actions-types';

interface UpdateProfileAction {
  type: ActionType.UPDATE_PROFILE;
}

interface UpdateProfileSuccessAction {
  type: ActionType.UPDATE_PROFILE_SUCCESS;
  payload:any
}

interface UpdateProfileErrorAction {
  type: ActionType.UPDATE_PROFILE_ERROR;
  payload: string;
}

export type Action =
  | UpdateProfileAction
  | UpdateProfileSuccessAction
  | UpdateProfileErrorAction
