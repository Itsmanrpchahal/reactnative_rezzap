import {Dispatch} from 'redux';
import {ActionType} from '@root/store/collegeList/actions-types';
import {Action} from '@root/store/collegeList/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const getCollegeList = () => {
  
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.COLLEGELIST_STATE_INIT,
    });

    try {
      const response = await service.get(apiUri.collegeList);

      dispatch({
        type: ActionType.COLLEGELIST_STATE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.COLLEGELIST_STATE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
