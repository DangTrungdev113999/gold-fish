import React from 'react';
import {FlatList, ScrollView} from 'react-native';

import {Card, Block} from '~/components';
import {Text} from '../components';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d723',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f634',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d725',
    title: 'Third Item',
  },
];

const Shoes = () => {
  return (
    <Block flex={1} center middle m="10px 0 0" bg="#f1f6f9">
      <FlatList
        data={DATA}
        renderItem={(item) => <Card />}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
    </Block>
  );
};

export default Shoes;
