import { Dispatch } from 'redux';
import { ActionType } from '@root/store/uploadPicture/actions-types';
import { Action } from '@root/store/uploadPicture/actions';
import { apiUri } from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 *
 * @param data
 */
export const uploadProfilePicture = (data: any) => {

  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.UPLOADPICTURE_INIT,
    });

    console.log('Image Data ====> ', JSON.stringify(data))
    try {
      const response = await service.post(apiUri.profilePictureUpload,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      dispatch({
        type: ActionType.UPLOADPICTURE_SUCCESS,
        payload: response.data,
      },
      );
      return response;
    } catch (e: any) {
      alert( e)
      dispatch({
        type: ActionType.UPLOADPICTURE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

