import {Dispatch} from 'redux';
import {ActionType} from '@root/store/addSupporter/actions-types';
import {Action} from '@root/store/addSupporter/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import Snackbar from 'react-native-snackbar';


export const addSupporter = (fn :any) => {

  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.ADD_SUPPORTER,
    });

    try {
      const response = await service.post(apiUri.addSupporter,fn);
    
      
      dispatch({
        type: ActionType.ADD_SUPPORTER_SUCCESS,
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
        type: ActionType.ADD_SUPPORTER_ERROR,
        payload: e.response.data.status,
      });
    }
  };
};

