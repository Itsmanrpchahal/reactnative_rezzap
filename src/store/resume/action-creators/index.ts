import {Dispatch} from 'redux';
import {ActionType} from '@root/store/resume/actions-types';
import {Action} from '@root/store/resume/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const getResume = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.RESUME_INIT,
    });

    try {
      const response =  await service.get(apiUri.resumeList);

      dispatch({
        type: ActionType.RESUME_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.RESUME_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
