// @ts-ignore
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {store} from './src/store';

import {QueryClientProvider, QueryClient} from 'react-query';
import {ThemeProvider} from 'styled-components';
import {navigationTheme} from './src/theme/theme';
import Routes from './src/navigation/Routes';
import { LogBox } from 'react-native';

const persistor = persistStore(store);
const queryClient = new QueryClient();

export default function App() {
  LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={navigationTheme.light}>
            <Routes scheme={navigationTheme.light} />
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
