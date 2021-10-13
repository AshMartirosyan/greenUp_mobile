import React from 'react';

import MainView from './src/MainView';

import {Provider as StoreProvider} from 'react-redux';
import {Provider as ThemeProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/redux/store';

import theme from './src/design/theme';

const App = () => {
  return (
    <>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <MainView />
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    </>
  );
};

export default App;
