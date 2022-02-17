import {ActionType} from '@root/store/categories/actions-types';

interface CategoryAction {
  type: ActionType.CATEGORIES_INIT;
}

interface CategorySuccessAction {
  type: ActionType.CATEGORIES_SUCCESS;
  payload:any
}

interface CategoryErrorAction {
  type: ActionType.CATEGORIES_ERROR;
  payload: string;
}

export type Action =
  | CategoryAction
  | CategorySuccessAction
  | CategoryErrorAction
