import {Dispatch} from 'redux';
import {ActionType} from '@root/store/uploadPicture/actions-types';
import {Action} from '@root/store/uploadPicture/actions';
import {apiUri} from '@root/service/apiEndPoints';
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

    console.log('Image Data ====> ',data)
    try {
      const response =  await service.post(apiUri.profilePictureUpload,data,{
        headers: {
          'Content-Type': `multipart/form-data`,
          'Accept':'*/*',
        },
      },);

      alert(JSON.stringify(response))
     
      dispatch({
        type: ActionType.UPLOADPICTURE_SUCCESS,
        payload: response.data,
      },
      );
      return response;
    } catch (e: any) {
        alert('Error ==> '+e)
      dispatch({
        type: ActionType.UPLOADPICTURE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

