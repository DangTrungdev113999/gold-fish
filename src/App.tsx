import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';

import theme from '~/config/theme';

import Navigation from '~/routes';

declare const global: {HermesInternal: null | {}};

const AppProvider = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Navigation />
    </ThemeProvider>
  );
};

export default AppProvider;
