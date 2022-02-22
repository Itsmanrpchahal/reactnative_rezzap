import {Dispatch} from 'redux';
import {ActionType} from '@root/store/addComment/actions-types';
import {Action} from '@root/store/addComment/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const addComments = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.ADD_COMMENT_INIT,
    });

    try {
      const response = await service.post(apiUri.add_Comment,fn);

      dispatch({
        type: ActionType.ADD_COMMENT_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.ADD_COMMENT_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
