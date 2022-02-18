import {Dispatch} from 'redux';
import {ActionType} from '@root/store/follow_unfollow/actions-types';
import {Action} from '@root/store/follow_unfollow/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const setFollowUnfollow = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.FOLLOW_UNFOLLOW_INIT,
    });

    try {
      const response =  await service.post(apiUri.followUnfollow,fn);

      dispatch({
        type: ActionType.FOLLOW_UNFOLLOW_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.FOLLOW_UNFOLLOW_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
