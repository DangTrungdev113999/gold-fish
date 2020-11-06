import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoesScreen from '../../containers/Shoes/Shoes';
import ActionShoe from '../../containers/Shoes/ActionShoe';
import {Block, Icon, Touchable} from '~/components';
import AddProductIcon from '~/components/Header/AddProductIcon';
import {mainOptions} from '../navigationOptions';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={mainOptions}>
    <Stack.Screen
      name="shoes_screen"
      component={ShoesScreen}
      options={({navigation}) => ({
        title: 'Giầy Bitis',
        headerLeft: () => <Block />,
        headerRight: () => <AddProductIcon navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="action_shoe_screen"
      component={ActionShoe}
      options={({navigation}) => ({
        title: 'Giầy Bitis',
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
  </Stack.Navigator>
);
