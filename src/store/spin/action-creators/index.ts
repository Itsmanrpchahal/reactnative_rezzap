import {Dispatch} from 'redux';
import {ActionType} from '@root/store/spin/actions-types';
import {Action} from '@root/store/spin/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 *
 * @param data
 */
export const getSpin = (data:any) => {
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.SPIN_INIT,
    });

    try {
      const response =  await service.get(data==='all' ?apiUri.allSpin : apiUri.mySpin);

      dispatch({
        type: ActionType.SPIN__SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.SPIN__ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

