import {ActionType} from '@root/store/supportUnsupport/actions-types';

interface SupportUnsupportAction {
  type: ActionType.SUPPORT_UNSUPPORT_INIT;
}

interface SupportUnsupportSuccessAction {
  type: ActionType.SUPPORT_UNSUPPORT_SUCCESS;
  payload:any
}

interface SupportUnsupportErrorAction {
  type: ActionType.SUPPORT_UNSUPPORT_SUCCESS;
  payload: string;
}

export type Action =
  | SupportUnsupportAction
  | SupportUnsupportSuccessAction
  | SupportUnsupportErrorAction
