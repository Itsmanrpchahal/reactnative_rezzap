import {Dispatch} from 'redux';
import {ActionType} from '@root/store/categories/actions-types';
import {Action} from '@root/store/categories/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const getCategories = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.CATEGORIES_INIT,
    });

    try {
      const response = await service.get(apiUri.showCategories);

      dispatch({
        type: ActionType.CATEGORIES_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.CATEGORIES_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};


export const addCategory = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.CATEGORIES_INIT,
    });

    try {
      const response = await service.post(apiUri.addCategory+fn.title);

      dispatch({
        type: ActionType.CATEGORIES_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.CATEGORIES_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const deleteCategory = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.CATEGORIES_INIT,
    });

    try {
      const response = await service.delete(apiUri.deleteCategory +fn.id,);

      dispatch({
        type: ActionType.CATEGORIES_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.CATEGORIES_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};


export const updateCategory = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.CATEGORIES_INIT,
    });

    try {
      const response = await service.put(apiUri.categoryUpdate ,fn);

      dispatch({
        type: ActionType.CATEGORIES_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.CATEGORIES_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const storeCategory = (fn:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.CATEGORIES_INIT,
    });

    try {
      const response = await service.put(apiUri.storeCategory +fn);

      dispatch({
        type: ActionType.CATEGORIES_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.CATEGORIES_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
}
