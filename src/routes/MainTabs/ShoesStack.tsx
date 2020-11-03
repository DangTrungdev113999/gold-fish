import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShoesScreen from '../../containers/Shoe/Shoes';
import AddShoeScreen from '../../containers/Shoe/AddShoe';
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
      name="add_shoe_screen"
      component={AddShoeScreen}
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
