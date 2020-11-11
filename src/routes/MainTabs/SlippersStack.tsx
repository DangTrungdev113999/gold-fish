//@ts-nocheck
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SlippersScreen from '~/containers/Slippers';
import { Block, Touchable, Icon } from '~/components';
import { AddProductIcon, DeleteProductIcon } from '~/components/Header';
import ActionSlipper from '~/containers/Slippers/ActionSlipper';
import { mainOptions } from '../navigationOptions';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name="slippers_screen"
      component={SlippersScreen}
      options={({ navigation, route }) => ({
        title: 'NO LIMIT trên đôi Bitis',
        headerLeft: () => <Block />,
        headerRight: () => (
          <AddProductIcon
            navigation={navigation}
            route={route}
            fromScreen="slipper"
          />
        ),
      })}
    />
    <Stack.Screen
      name="action_slipper_screen"
      component={ActionSlipper}
      options={({ navigation, route }) => ({
        title: route.params?.slipperDetail?.slipperId
          ? `#${route.params.slipperDetail.slipperId}`
          : 'Thêm dép',
        headerLeft: () => (
          <Touchable m="0 0 0 10px" onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-small-left"
              type="entypo"
              size={30}
              color="#fff"
            />
          </Touchable>
        ),
        headerRight: () =>
          route.params?.slipperDetail?.slipperId ? (
            <DeleteProductIcon
              navigation={navigation}
              route={route}
              fromScreen="action_slipper"
            />
          ) : (
            <Block />
          ),
      })}
    />
  </Stack.Navigator>
);
