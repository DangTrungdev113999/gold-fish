//@ts-nocheck
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favourite from '~/containers/Favourite';
import { Block } from '~/components';
import { mainOptions } from '../../navigationOptions';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name="favourite_screen"
      component={Favourite}
      options={({ navigation }) => ({
        title: 'NO LIMIT',
        headerLeft: () => <Block navigation={navigation} />,
        headerRight: () => <Block navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
);
