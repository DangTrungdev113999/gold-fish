import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ShoesStack from './ShoesStack';
import SlippersStack from './SlippersStack';
import UserStack from './UserStack';

import { Icon } from '~/components';
import theme from '~/config/theme';

const Tab = createBottomTabNavigator();

function getTabBarVisible(route: any) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'shoes_screen';

  if (routeName === 'shoes_screen' || routeName === 'slippers_screen') {
    return true;
  }
  return false;
}

export default function () {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.color.secondary,
        inactiveTintColor: theme.color.light,
        style: {
          borderTopWidth: 0,
          height: 60,
        },
        tabStyle: {
          backgroundColor: theme.color.primary,
          paddingVertical: 4,
        },
        labelStyle: {
          fontSize: 12,
          fontFamily: theme.font.primary,
        },
      }}>
      <Tab.Screen
        name="shoes_stack"
        component={ShoesStack}
        options={({ route }) => ({
          tabBarLabel: 'giày',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shoe-formal"
              type="materialCommunityIcons"
              color={focused ? theme.color.secondary : '#fff'}
              size={22}
            />
          ),
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name="slippers_tab"
        component={SlippersStack}
        options={({ route }) => ({
          tabBarLabel: 'Dép',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="beach-slipper"
              type="fontisto"
              color={focused ? theme.color.secondary : '#fff'}
              size={22}
            />
          ),
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name="setting_tab"
        component={UserStack}
        options={({ route }) => ({
          tabBarLabel: 'Cá nhân',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="user-circle"
              type="fontAwesome"
              color={focused ? theme.color.secondary : '#fff'}
              size={22}
            />
          ),
          tabBarVisible: getTabBarVisible(route),
        })}
      />
    </Tab.Navigator>
  );
}
