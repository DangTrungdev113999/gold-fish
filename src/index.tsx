//@ts-nocheck
import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AnimatedSplash from 'react-native-animated-splash-screen';
import theme from '~/config/theme';
import Navigation from '~/routes';

import configStore from './configStore';

LogBox.ignoreLogs([
  'componentWillUpdate',
  'componentWillMount',
  'componentWillReceiveProps',
  'ViewPagerAndroid',
]);
// TODO delete
LogBox.ignoreAllLogs();

const AppProvider = () => {
  const store = configStore().store;
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <PersistGate persistor={configStore().persistor}>
          {(bootstrapped) => {
            console.log(bootstrapped);
            return (
              <AnimatedSplash
                translucent={true}
                isLoaded={bootstrapped}
                logoImage={require('../assets/images/logo.png')}
                backgroundColor={theme.color.bg}
                logoHeight={150}
                logoWidth={150}>
                <Navigation />
              </AnimatedSplash>
            );
          }}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default AppProvider;
