//@ts-nocheck
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoesScreen from '~/containers/Shoes';
import ActionShoe from '~/containers/Shoes/ActionShoe';
import { Block, Icon, Touchable } from '~/components';
import {
  AddProductIcon,
  DeleteProductIcon,
  MenuIcon,
} from '~/components/Header';
import { mainOptions } from '../../navigationOptions';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name="shoes_screen"
      component={ShoesScreen}
      options={({ navigation, route }) => ({
        title: 'NO LIMIT',
        headerLeft: () => <MenuIcon navigation={navigation} />,
        headerRight: () => (
          <AddProductIcon
            navigation={navigation}
            route={route}
            fromScreen="shoes"
          />
        ),
      })}
    />
    <Stack.Screen
      name="action_shoe_screen"
      component={ActionShoe}
      options={({ navigation, route }) => ({
        title: route.params?.shoeDetail?.shoeId
          ? `#${route.params.shoeDetail.shoeId}`
          : 'Thêm giày',
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
          route.params?.shoeDetail?.shoeId ? (
            <DeleteProductIcon
              navigation={navigation}
              route={route}
              fromScreen="action_shoe"
            />
          ) : (
            <Block />
          ),
      })}
    />
  </Stack.Navigator>
);
