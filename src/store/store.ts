import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from '@root/store/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const middlewares = [thunk, logger];

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

let persistor = persistStore(store);

export {store, persistor};
