import React, {useEffect} from 'react';
import {FlatList} from 'react-native';

import {Card, Block} from '~/components';

import {fetchShoes} from '~/modules/shoes/api';

const DATA = [
  {
    id: '3ad53abb28ba',
    title: 'First Item',
    img: 'http://lorempixel.com/400/200/',
  },
  {
    id: 'fbd91aa97f63',
    title: 'Second Item',
    img: 'http://lorempixel.com/400/200/sports/1/',
  },
  {
    id: '145571e29d72',
    title: 'Third Item',
    img: 'https://picsum.photos/400/200/',
  },
  {
    id: '3ad53abb28ba1',
    title: 'First Item',
    img: 'https://picsum.photos/id/137/400/200',
  },
  {
    id: 'fbd91aa97f632',
    title: 'Second Item',
    img: 'https://picsum.photos/id/237/400/200',
  },
  {
    id: '145571e29d723',
    title: 'Third Item',
    img: 'https://picsum.photos/id/130/400/200',
  },
  {
    id: '3ad53abb28ba3',
    title: 'First Item',
    img: 'https://picsum.photos/id/133/400/200',
  },
  {
    id: 'fbd91aa97f634',
    title: 'Second Item',
    img: 'https://picsum.photos/id/139/400/200',
  },
  {
    id: '145571e29d725',
    title: 'Third Item',
    img: 'https://picsum.photos/id/140/400/200',
  },
];

const Shoes = () => {
  const fetchData = async () => {
    const shoesList = await fetchShoes();
    // console.log(shoesList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Block flex={1} center middle p="10px 0 0" bg="bg">
      <FlatList
        data={DATA}
        renderItem={({item}) => <Card item={item} />}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
    </Block>
  );
};

export default Shoes;
