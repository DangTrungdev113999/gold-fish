import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { Touchable, Icon, Block, Input } from '~/components';

import Option from './Option';

import theme from '~/config/theme';
import { FlatList } from 'react-native-gesture-handler';
import { shoeType } from '~/@types';
import { searchShoesApi } from '~/modules/shoes/apis';
import { SHOE_PREFIX } from '~/config/constants';
import Text from '../Text';
const SearchModal = () => {
  const [shoesMatch, setShoesMatch] = useState<shoeType[]>([]);
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState('');

  const onReset = () => {
    setProductId('');
    setShoesMatch([]);
  };

  const onOpen = () => {
    onReset();
    setVisible(true);
  };

  const onClose = () => {
    onReset();
    setVisible(false);
  };

  const onSearchShoe = async (q: string) => {
    setProductId(q);
    const flag = setTimeout(async () => {
      clearTimeout(flag);
      const shoesList = await searchShoesApi(productId);
      setShoesMatch(shoesList as shoeType[]);
    }, 100);
  };

  const setPrefixProductId = (prefix: string) => {
    const flag = [...productId].slice('');
    flag.splice(0, 0, prefix);
    onSearchShoe(flag.join(''));
  };

  console.log(setProductId);

  return (
    <Block absolute right="20px" bottom="40px">
      <Touchable
        w="60px"
        h="60px"
        borderRadius="30px"
        bg="#5E718C"
        center
        middle
        shadow
        onPress={onOpen}>
        <Icon name="search" type="fontAwesome5" color={theme.color.secondary} />
      </Touchable>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="slideInDown"
        backdropColor={theme.color.neutral8}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.6}
        style={{ margin: 0, justifyContent: 'flex-end' }}>
        <Block h="500px" borderRadius="15px" bg="#1D2636">
          <Touchable row justify="space-around" middle block h="30px">
            <Touchable flex={1} />
            <Touchable flex={1} onPress={onClose} center middle m="0 0 0 20px">
              <Icon
                name="ios-chevron-down-sharp"
                type="ionicons"
                size={30}
                color={theme.color.secondary}
              />
            </Touchable>

            <Touchable
              flex={1}
              row
              justify="flex-end"
              m="0 20px 0 0"
              onPress={onReset}>
              <Text color={theme.color.secondary}>Reset</Text>
            </Touchable>
          </Touchable>
          <Block h="0.5px" block bg="#1A4253" />
          <Input
            m="20px 20px 0"
            placeholder="Nhập mã giầy"
            iconLeftName="search1"
            iconLeftType="antDesign"
            returnKeyType="search"
            autoCapitalize="characters"
            value={productId}
            onChangeText={(val: string) => onSearchShoe(val)}
          />

          <FlatList
            data={shoesMatch}
            renderItem={({ item }: { item: shoeType }) => (
              <Option item={item} />
            )}
            keyExtractor={(item: shoeType) => item.shoeId}
          />
          <Block h="0.5px" block bg="#1A4253" />
          <Block p="10px">
            <FlatList
              data={SHOE_PREFIX}
              horizontal
              renderItem={({ item }: { item: string }) => (
                <Touchable
                  onPress={() => setPrefixProductId(item)}
                  m="0 10px 0 0"
                  p="10px"
                  bg="#24364E"
                  borderRadius="10px">
                  <Text color={theme.color.neutral2}>{item}</Text>
                </Touchable>
              )}
              keyExtractor={(item) => item}
            />
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};

export default SearchModal;
