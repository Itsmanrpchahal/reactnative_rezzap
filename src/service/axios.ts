import axios from "axios";
import { CommonActions } from "@react-navigation/native";
import { baseURL } from "@root/service/apiEndPoints";
import Snackbar from "react-native-snackbar";

// @ts-ignore
import { persistor, store } from "@root/store";
import { navigationRef } from "../navigation/RootNavigation";
import navigationStrings from "@root/navigation/navigationStrings";
import { clearAll } from "../storage";
import { ActionType } from "@root/store/login/actions-types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const state = store.getState();
const instance = axios.create({
  baseURL: baseURL,
  timeout: 50000,
  timeoutErrorMessage: "Timeout error",
});

AsyncStorage.getItem('TOKEN').then((asyncStorageRes) => {
  // @ts-ignore
  instance.defaults.headers.common.Authorization = `Bearer ${asyncStorageRes}`;
});
export const setAuthInitalToken = (token: string) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

instance.defaults.headers.common.Accept = `application/json`;
instance.defaults.headers.common.Connection = "keep-alive"


instance.interceptors.request.use(payload => {
  console.log("Payload   ==== >  ", payload);

  return payload;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('Error ====> ',JSON.stringify(error))
    // if (error.response.status === 401) {
    //   persistor.purge().then(async () => {
    //     await clearAll();
    //     store.dispatch({
    //       type: ActionType.SET_AUTHENTICATION,
    //       payload: false,
    //     });
    //     navigationRef.current.dispatch(
    //       CommonActions.navigate({
    //         name: navigationStrings.LOGIN,
    //       }),
    //     );
    //   });
    //   Snackbar.show({
    //     text: 'Token expire',
    //     duration: Snackbar.LENGTH_SHORT,
    //   });
    // }

    return Promise.reject(error);
  },
);

export default instance;