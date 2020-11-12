import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import theme from '~/config/theme';
import Navigation from '~/routes';

import store from './configStore';

LogBox.ignoreLogs([
  'componentWillUpdate',
  'componentWillMount',
  'componentWillReceiveProps',
  'ViewPagerAndroid',
]);
// TODO delete
LogBox.ignoreAllLogs();
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
