import {Dispatch} from 'redux';
import {ActionType} from '@root/store/my-graph/actions-types';
import {Action} from '@root/store/my-graph/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const getMyGraph = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_GRAPH,
    });

    try {
      const response = await service.get(apiUri.myGraph);

      dispatch({
        type: ActionType.MY_GRAPH_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MY_GRAPH_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};


/**
 *
 * @param data
 */
export const getSupporterGraph = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_GRAPH,
    });

    try {
      const response = await service.get(apiUri.myGraph);

      dispatch({
        type: ActionType.MY_GRAPH_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.MY_GRAPH_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
