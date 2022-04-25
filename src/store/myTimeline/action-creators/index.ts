import {Dispatch} from 'redux';
import {ActionType} from '@root/store/myTimeline/actions-types';
import {Action} from '@root/store/myTimeline/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';


export const getMyTimeline = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MYTIMELINE_INIT,
    });

    try {
      const response = await service.get(apiUri.activityShow);

      dispatch({
        type: ActionType.MYTIMELINE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MYTIMELINE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const addActivity = (data: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MYTIMELINE_INIT,
    });

    try {
      const response = await service.post(apiUri.activityStore,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },);

      dispatch({
        type: ActionType.MYTIMELINE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MYTIMELINE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};



