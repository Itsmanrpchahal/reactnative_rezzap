import {Dispatch} from 'redux';
import {ActionType} from '@root/store/dreamCollege/actions-types';
import {Action} from '@root/store/dreamCollege/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const getDreamCollegeList = () => {
  
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.DREAMCOLLEGE_STATE_INIT,
    });

    try {
      const response = await service.get(apiUri.dreamCollege);

      dispatch({
        type: ActionType.DREAMCOLLEGE_STATE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.DREAMCOLLEGE_STATE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
