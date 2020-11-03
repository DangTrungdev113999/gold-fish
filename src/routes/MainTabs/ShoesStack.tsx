import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoesScreen from '../../containers/Shoes';
import {Block, Icon} from '~/components';
import AddProductIcon from '~/components/Header/AddProductIcon';
import {mainOptions} from '../navigationOptions';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name="slippers_screen"
      component={ShoesScreen}
      options={() => ({
        title: 'Giầy Bitis',
        headerLeft: () => <Block />,
        headerRight: () => <AddProductIcon />,
      })}
    />
  </Stack.Navigator>
);
