import {Dispatch} from 'redux';
import {ActionType} from '@root/store/resumeActivity/actions-types';
import {Action} from '@root/store/resumeActivity/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const resume_ActivityList = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.RESUME_ACTIVITY_INIT,
    });

    try {
      const response =  await service.get(apiUri.resume_Activity+fn.cat_id)

      dispatch({
        type: ActionType.RESUME_ACTIVITY_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.RESUME_ACTIVITY_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

