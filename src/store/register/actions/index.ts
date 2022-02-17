import {ActionType} from '@root/store/register/actions-types';

interface SignUpAction {
  type: ActionType.SIGNUP;
}

interface SignUpSuccessAction {
  type: ActionType.SIGNUP_SUCCESS;
  payload: any;
}


interface SignUpErrorAction {
  type: ActionType.SIGNUP_ERROR;
  payload: string;
}



export type Action =
  | SignUpAction
  | SignUpSuccessAction
  | SignUpErrorAction

