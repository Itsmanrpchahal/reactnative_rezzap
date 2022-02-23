import {Dispatch} from 'redux';
import {ActionType} from '@root/store/deleteSupporter/actions-types';
import {Action} from '@root/store/deleteSupporter/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import Snackbar from 'react-native-snackbar';


export const deleteSupporter = (fn :any) => {

  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.DELETE_SUPPORTER,
    });

    try {
      const response = await service.delete(apiUri.deleteSupporter+fn);
    
      
      dispatch({
        type: ActionType.DELETE_SUPPORTER_SUCCESS,
        payload: response,
      });
      if(response.data.status===true)
      {
        Snackbar.show({
          text: response.data.message,
          duration: Snackbar.LENGTH_SHORT,
        })
      }
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.DELETE_SUPPORTER_ERROR,
        payload: e.response.data.status,
      });
    }
  };
};

