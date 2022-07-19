import {Dispatch} from 'redux';
import {ActionType} from '@root/store/interests/actions-types';
import {Action} from '@root/store/interests/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {SupporterInterface} from '../interface/SupporterInterface';

export const getMyInterest = () => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_INTEREST,
    });

    try {
      const response = await service.get(apiUri.interests);

      dispatch({
        type: ActionType.MY_INTEREST_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.MY_INTEREST_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const deleteMyInterest = (fn: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_INTEREST,
    });

    try {
      const response = await service.delete(apiUri.deleteInterest + fn.id);

      dispatch({
        type: ActionType.MY_INTEREST_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.MY_INTEREST_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const addNew_Interest = (data: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_INTEREST,
    });

    try {
      const response = await service.post(apiUri.addInterest, data);

      dispatch({
        type: ActionType.MY_INTEREST_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.MY_INTEREST_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const UpdateInterest = (data: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_INTEREST,
    });

    try {
      const response = await service.post(apiUri.update_Interest, data);

      dispatch({
        type: ActionType.MY_INTEREST_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.MY_INTEREST_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const supporters_InterestList = (fn: any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.MY_INTEREST,
    });

    try {
      const response = await service.get(
        apiUri.supportersInterestList + fn.supporter_id,
      );

      dispatch({
        type: ActionType.MY_INTEREST_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.MY_INTEREST_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};
