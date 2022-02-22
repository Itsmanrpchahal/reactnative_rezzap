import {Dispatch} from 'redux';
import {ActionType} from '@root/store/allCollegeList/actions-types';
import {Action} from '@root/store/allCollegeList/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

export const getAllCollege = () => {
  
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.ALL_COLLEGE_INIT,
    });

    try {
      const response = await service.get(apiUri.allCollegeList);

      dispatch({
        type: ActionType.ALL_COLLEGE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.ALL_COLLEGE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const search_StateSchool = (fn:any) => {
  
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.ALL_COLLEGE_INIT,
    });

    try {
      const response = await service.get(apiUri.searchStateSchool+fn.state+"&school_type="+fn.school_type);

      dispatch({
        type: ActionType.ALL_COLLEGE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.ALL_COLLEGE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

export const search_CollegeKeyword = (fn:any) => {
  
  return async (dispatch: Dispatch<Action | any>) => {
    dispatch({
      type: ActionType.ALL_COLLEGE_INIT,
    });

    try {
      const response = await service.get(apiUri.searchCollegeKeyword+fn.keyword);

      dispatch({
        type: ActionType.ALL_COLLEGE_SUCCESS,
        payload: response.data,
      });
      return response;
    } catch (e: any) {

      dispatch({
        type: ActionType.ALL_COLLEGE_ERROR,
        payload: 'Somethings wents wrong',
      });
    }
  };
};

