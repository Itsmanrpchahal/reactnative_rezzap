import {ActionType} from '@root/store/uploadPicture/actions-types';

interface UploadPictureAction {
  type: ActionType.UPLOADPICTURE_INIT;
}

interface UploadPictureSuccessAction {
  type: ActionType.UPLOADPICTURE_SUCCESS;
  payload:any
}

interface UploadPictureErrorAction {
  type: ActionType.UPLOADPICTURE_ERROR;
  payload: string;
}

export type Action =
  | UploadPictureAction
  | UploadPictureSuccessAction
  | UploadPictureErrorAction
