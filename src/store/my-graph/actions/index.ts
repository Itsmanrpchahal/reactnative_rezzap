import {ActionType} from '@root/store/my-graph/actions-types';

interface MyGraphAction {
  type: ActionType.MY_GRAPH;
}

interface MyGraphSuccessAction {
  type: ActionType.MY_GRAPH_SUCCESS;
  payload:any
}

interface MyGraphErrorAction {
  type: ActionType.MY_GRAPH_ERROR;
  payload: string;
}

export type Action =
  | MyGraphAction
  | MyGraphSuccessAction
  | MyGraphErrorAction
