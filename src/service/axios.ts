import axios from "axios";
import { baseURL } from "@root/service/apiEndPoints";
import Snackbar from "react-native-snackbar";

// @ts-ignore
import {  store } from "@root/store";
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
    console.log('Error ==> ',error.response.data.status)
    if(error.response.data && !error.response.data.status)
    {
      // Snackbar.show({
      //   text: error && error.response.data.message,
      //   duration: Snackbar.LENGTH_SHORT,
      // })
    }

    return Promise.reject(error);
  },
);

export default instance;
