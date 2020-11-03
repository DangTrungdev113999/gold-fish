import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ShoesStack from './ShoesStack';
import SlippersStack from './SlippersStack';

const Tab = createBottomTabNavigator();

// function getTabBarVisible(route) {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : route.params?.screen || 'home_screen';

//   if (
//     routeName === 'home_screen' ||
//     routeName === 'manage_screen' ||
//     routeName === 'available_loans_screen' ||
//     routeName === 'notification_screen' ||
//     routeName === 'user_screen'
//   ) {
//     return true;
//   }
//   return false;
// }

export default function () {
  return (
    <Tab.Navigator
    //   tabBarOptions={{
    //     activeTintColor: theme?.color?.primary,
    //     inactiveTintColor: theme?.color?.neutral6,
    //     style: {
    //       borderTopWidth: 0.5,
    //       borderTopColor: theme?.color?.neutral4,
    //       height: 50,
    //       paddingTop: 3,
    //     },
    //     tabStyle: {
    //       backgroundColor: theme?.color?.light,
    //       paddingVertical: 4,
    //     },
    //     labelStyle: {
    //       fontSize: 12,
    //       fontFamily: theme?.font?.primary,
    //     },
    //       }}
    >
      <Tab.Screen
        name="shoes_stack"
        component={ShoesStack}
        options={({route}) => ({
          tabBarLabel: 'Giầy',
          //   tabBarIcon: ({focused}) => (
          //     <Icon name={focused ? 'logo-fill' : 'logo'} size={22} />
          //   ),
          //   tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name="slippers_tab"
        component={SlippersStack}
        options={({route}) => ({
          tabBarLabel: 'Dép',
          //   tabBarIcon: ({focused}) => (
          //     <Icon name={focused ? 'manage-fill' : 'manage'} size={22} />
          //   ),
          //   tabBarVisible: getTabBarVisible(route),
        })}
      />
    </Tab.Navigator>
  );
}
