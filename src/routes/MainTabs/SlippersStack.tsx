import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SlippersScreen from '../../containers/Slippers';

import {mainOptions} from '../navigationOptions';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name="slippers_screen"
      component={SlippersScreen}
      options={() => ({
        title: 'dép',
      })}
    />
  </Stack.Navigator>
);
