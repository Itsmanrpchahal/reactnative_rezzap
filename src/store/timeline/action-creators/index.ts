import {Dispatch} from 'redux';
import {ActionType} from '@root/store/timeline/actions-types';
import {Action} from '@root/store/timeline/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import { SupporterTimelineInterface } from "../interface/SupporterTimelineInterface";


export const getMyTimeline = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.TIMELINE_INIT,
    });

    try {
      const response = await service.get(apiUri.activityShow);

      dispatch({
        type: ActionType.TIMELINE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.TIMELINE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const getSupporterTimeline = (fn:SupporterTimelineInterface) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.TIMELINE_INIT,
    });

    try {
      const response = await service.get(apiUri.supporterActivityShow+fn.supporter_id);

      dispatch({
        type: ActionType.TIMELINE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.TIMELINE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const deleteTimelineItem = (fn:any) => {

  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.TIMELINE_INIT,
    });

    try {
      const response = await service.delete(apiUri.deleteActivity+fn.id);

      dispatch({
        type: ActionType.TIMELINE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.TIMELINE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const search_Activity = (fn:any) => {

  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.TIMELINE_INIT,
    });

    try {
      const response = await service.get(apiUri.searchActivity+fn.id);

      dispatch({
        type: ActionType.TIMELINE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.TIMELINE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};






