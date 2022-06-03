import {Dispatch} from 'redux';
import {ActionType} from '@root/store/activityCategory/actions-types';
import {Action} from '@root/store/activityCategory/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const getActivityCategories = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.ACTIVITY_CATEGORIES_INIT,
    });

    try {
      const response = await service.get(apiUri.activityCategory);

      dispatch({
        type: ActionType.ACTIVITY_CATEGORIES_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.ACTIVITY_CATEGORIES_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};