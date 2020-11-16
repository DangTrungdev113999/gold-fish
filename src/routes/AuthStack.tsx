//@ts-nocheck
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '~/containers/Auth/Welcome';
import LoginScreen from '~/containers/Auth/Login';
import VerificationScreen from '~/containers/Auth/Verification';

import { mainOptions } from './navigationOptions';

const { Navigator, Screen } = createStackNavigator();

export default () => (
  <Navigator screenOptions={mainOptions}>
    <Screen
      name="welcome_screen"
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name="login_screen"
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name="verification_screen"
      component={VerificationScreen}
      options={{
        headerShown: false,
      }}
    />
  </Navigator>
);
