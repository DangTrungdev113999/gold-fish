import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'react-redux';

import store from './configStore';

import theme from '~/config/theme';
import Navigation from '~/routes';

declare const global: {HermesInternal: null | {}};

const AppProvider = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
};

export default AppProvider;
