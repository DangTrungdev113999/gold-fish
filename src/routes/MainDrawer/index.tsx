//@ts-nocheck

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabs from './MainTabs';
import settingsStack from './settingsStack';

import CustomDrawer from '~/containers/Drawer/Drawer';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="main_tabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="settings_stack"
        component={settingsStack}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
