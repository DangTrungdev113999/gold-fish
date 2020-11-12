//@ts-nocheck
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Block } from '~/components';
import UserScreen from '~/containers/User';
import { mainOptions } from '../../navigationOptions';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name="user_screen"
      component={UserScreen}
      options={() => ({
        title: 'Cá nhân',
        headerLeft: () => <Block />,
        headerRight: () => <Block />,
      })}
    />
  </Stack.Navigator>
);
