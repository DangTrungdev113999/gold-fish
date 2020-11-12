//@ts-nocheck
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '~/containers/Settings';
import { Block, Touchable, Icon } from '~/components';

import { mainOptions } from '../navigationOptions';

const { Navigator, Screen } = createStackNavigator();

export default () => (
  <Navigator screenOptions={mainOptions}>
    <Screen
      name="settings_screen"
      component={SettingsScreen}
      options={({ navigation }) => ({
        title: 'Cài đặt cá nhân',
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
        headerRight: () => <Block />,
      })}
    />
  </Navigator>
);
