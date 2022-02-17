import {Dispatch} from 'redux';
import {ActionType} from '@root/store/uploadPicture/actions-types';
import {Action} from '@root/store/uploadPicture/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 *
 * @param data
 */
export const uploadProfilePicture = (data: FormData) => {
  console.log('CHECK IMAGDA DATA ',data)
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.UPLOADPICTURE_INIT,
    });

    try {
      const response =  await service.post(apiUri.profilePictureUpload,data,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept':'*/*',
          'Accept-Encoding' :'gzip, deflate, br'
        },
      },);

      console.log('Image Repsonse====>   ',response)
      dispatch({
        type: ActionType.UPLOADPICTURE_SUCCESS,
        payload: response.data,
      },
      );
      return response;
    } catch (e: any) {
        console.log('Image Error ====>  ',JSON.stringify(e))
      dispatch({
        type: ActionType.UPLOADPICTURE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

