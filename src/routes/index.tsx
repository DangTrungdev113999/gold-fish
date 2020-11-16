import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { tokenSelector } from '~/modules/Auth/selectors';

import MainDrawer from './MainDrawer';
import AuthSTack from './AuthStack';

const Stack = createStackNavigator();

const Navigation = () => {
  const token = useSelector(tokenSelector);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {!token ? (
          <Stack.Screen
            name="auth_stack"
            component={AuthSTack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="main_drawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
