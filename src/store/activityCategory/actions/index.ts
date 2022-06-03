import {ActionType} from '@root/store/activityCategory/actions-types';

interface CategoryAction {
  type: ActionType.ACTIVITY_CATEGORIES_INIT;
}

interface CategorySuccessAction {
  type: ActionType.ACTIVITY_CATEGORIES_SUCCESS;
  payload:any
}

interface CategoryErrorAction {
  type: ActionType.ACTIVITY_CATEGORIES_ERROR;
  payload: string;
}

export type Action =
  | CategoryAction
  | CategorySuccessAction
  | CategoryErrorAction
