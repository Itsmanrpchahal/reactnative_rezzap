import {Dispatch} from 'redux';
import {ActionType} from '@root/store/resumeCategory/actions-types';
import {Action} from '@root/store/resumeCategory/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const resume_CategoryList = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.RESUME_CATEGORY_INIT,
    });

    try {
      const response =  await service.get(apiUri.resumeCategorylist)

      dispatch({
        type: ActionType.RESUME_CATEGORY_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.RESUME_CATEGORY_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

