import {Dispatch} from 'redux';
import {ActionType} from '@root/store/college/actions-types';
import {Action} from '@root/store/college/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const getCollegeStates = () => {
  
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.COLLEGE_STATE_INIT,
    });

    try {
      const response = await service.get(apiUri.collegeStateList);

      dispatch({
        type: ActionType.COLLEGE_STATE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.COLLEGE_STATE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
