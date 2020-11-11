/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import { Touchable, Icon, Block, Input, Loading, Text } from '~/components';

import Option from './Option';
import { searchShoesApi } from '~/modules/shoes/apis';
import { COLOR_CODE, SHOE_PREFIX } from '~/config/constants';
import { shoeType } from '~/@types';

import theme from '~/config/theme';
import HideOption from './HideOption';
import { Keyboard } from 'react-native';
const SearchModal = () => {
  const [shoesMatch, setShoesMatch] = useState<shoeType[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState('');
  const [keyboardType, setKeyboardType] = useState('default');

  const inputRef = useRef();

  const onReset = () => {
    setProductId('');
    setShoesMatch([]);
    setKeyboardType('default');
    Keyboard.dismiss();
  };

  const onOpen = () => {
    onReset();
    setVisible(true);
  };

  const onClose = () => {
    onReset();
    setVisible(false);
  };

  const onSearchProduct = async () => {
    setLoading(true);
    const flag = setTimeout(async () => {
      clearTimeout(flag);
      const shoesList = await searchShoesApi(productId);
      setShoesMatch(shoesList as shoeType[]);
    }, 100);
    setLoading(false);
  };

  useEffect(() => {
    const codeRegx = /[0-9]+/g;
    if (productId) {
      if (
        //@ts-ignore
        productId.match(codeRegx)?.[0]?.length === 5
      ) {
        Keyboard.dismiss();
        setKeyboardType('default');
      }
      onSearchProduct();
    }
  }, [productId]);

  const setPrefixProductId = (prefix: string) => {
    if (SHOE_PREFIX.indexOf(productId.slice(0, 4)) !== -1) {
      setProductId(`${prefix}${productId.slice(4)}`);
    } else if (SHOE_PREFIX.indexOf(productId.slice(0, 3)) !== -1) {
      setProductId(`${prefix}${productId.slice(3)}`);
    } else {
      setProductId(`${prefix}${productId}`);
    }
    setKeyboardType('number-pad');
    //@ts-ignore
    const forus = setTimeout(() => {
      clearTimeout(forus);
      inputRef.current.focus();
    }, 500);
  };

  const setColorCodeProductId = (code: string) => {
    if (true) {
      setProductId(`${productId.split('-')[0]}${code}`);
    }
  };

  return (
    <Block absolute right="20px" bottom="40px">
      <Touchable
        w="60px"
        h="60px"
        borderRadius="30px"
        bg={theme.color.grayLight}
        center
        middle
        shadow
        onPress={onOpen}>
        <Icon name="search" type="fontAwesome5" color={theme.color.secondary} />
      </Touchable>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor={theme.color.neutral8}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.6}
        style={{ margin: 0, justifyContent: 'flex-end' }}>
        <Block h="510px" borderRadius="15px" bg="#1D2636">
          <Touchable row justify="space-around" middle block h="40px">
            <Touchable flex={1} />
            <Touchable
              flex={1}
              onPress={onClose}
              center
              middle
              m="0 0 0 20px"
              disabled={loading}>
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
              {loading ? (
                <Loading />
              ) : (
                <Text color={theme.color.secondary}>Reset</Text>
              )}
            </Touchable>
          </Touchable>
          <Block h="0.5px" block bg="#1A4253" />
          <Input
            ref={inputRef}
            m="20px 20px 0"
            placeholder="Nhập mã giầy"
            iconLeftName="search1"
            iconLeftType="antDesign"
            returnKeyType="search"
            autoCapitalize="characters"
            keyboardType={keyboardType}
            // onSubmitEditing={Keyboard.dismiss}
            value={productId}
            onChangeText={(val: string) => setProductId(val)}
          />

          <FlatList
            data={shoesMatch}
            renderItem={({ item }: { item: shoeType }) => (
              <Option item={item} onClose={onClose} />
            )}
            keyExtractor={(item: shoeType) => item.shoeId}
          />

          <Block h="0.5px" block bg="#1A4253" />
          <HideOption items={SHOE_PREFIX} setString={setPrefixProductId} />

          <Block h="0.5px" block bg="#1A4253" />
          <HideOption items={COLOR_CODE} setString={setColorCodeProductId} />
        </Block>
      </Modal>
    </Block>
  );
};

export default SearchModal;
