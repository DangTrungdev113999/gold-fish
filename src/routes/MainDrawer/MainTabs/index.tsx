//@ts-nocheck
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ShoesStack from './ShoesStack';
import SlippersStack from './SlippersStack';
import UserStack from './UserStack';
import favouriteStack from './favouriteStack';

import { Block, Text, Touchable, LinearGradient } from '~/components';
import theme from '~/config/theme';
import styled from 'styled-components';

//@ts-ignore
const Image = styled.Image`
  width: ${({ isFocused }) => (isFocused ? '40px' : ' 35px')};
  height: ${({ isFocused }) => (isFocused ? '40px' : ' 35px')};
`;

const CusomTabBottom = ({ state, descriptors, navigation }) => {
  const key = state.routes[state.index].key;
  const isShowTabBar = descriptors[key].options.tabBarVisible;
  if (isShowTabBar) {
    return (
      <LinearGradient row bg={theme.color.primary} p="0 0  0">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const getIcon = () => {
            if (route.name === 'shoes_tab') {
              return require('@assets/images/shoes.png');
            }

            if (route.name === 'slippers_tab') {
              return require('@assets/images/slippers.png');
            }
            if (route.name === 'favourite_tab') {
              return require('@assets/images/favourite.png');
            }

            if (route.name === 'user_tab') {
              return require('@assets/images/user-3.png');
            }
            return require('@assets/images/shoes.png');
          };

          return (
            <Touchable
              onPress={onPress}
              onLongPress={onLongPress}
              flex={1}
              key={route.name}>
              <Block
                p="8px 20px"
                row
                middle
                center
                borderRadius="10px"
                bg={
                  isFocused ? theme.color.secondarylight2 : theme.color.blue3
                }>
                <Image source={getIcon()} isFocused={isFocused} />
              </Block>
            </Touchable>
          );
        })}
      </LinearGradient>
    );
  } else {
    return null;
  }
};

const getTabBarVisible = (route: any) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'shoes_screen';

  if (
    routeName === 'shoes_screen' ||
    routeName === 'slippers_screen' ||
    routeName === 'favourite_tab' ||
    routeName === 'user_screen'
  ) {
    return true;
  }
  return false;
};

const Tab = createBottomTabNavigator();

export default function () {
  return (
    <Tab.Navigator tabBar={(props) => <CusomTabBottom {...props} />}>
      <Tab.Screen
        name="shoes_tab"
        component={ShoesStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name="slippers_tab"
        component={SlippersStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name="favourite_tab"
        component={favouriteStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name="user_tab"
        component={UserStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
    </Tab.Navigator>
  );
}
