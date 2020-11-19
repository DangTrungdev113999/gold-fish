/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import { Touchable, Icon, Block, Input, Loading, Text } from '~/components';
import { useNavigation } from '@react-navigation/native';

import Option from './Option';
import { searchShoesApi } from '~/modules/Shoes/apis';
import { SHOE_PREFIX } from '~/config/constants';
import { shoeTypes } from '~/@types';

import theme from '~/config/theme';
import HideOption from './HideOption';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { searchSlippersApi } from '~/modules/Slippers/apis';
import { useSelector } from 'react-redux';
import {
  colorCodesSelector,
  shoePrefixesSelector,
  slipperPrefixesSelector,
} from '~/modules/User/selectors';
import styled from 'styled-components';

const windowHeight = Dimensions.get('window').height;

const Image = styled.Image`
  width: 60px;
  height: 60px;
  /* opacity: 0.8; */
`;

type PropsType = {
  productTarget: string;
};

const SearchModal = ({ productTarget }: PropsType) => {
  const [propductsMatch, setPropductsMatch] = useState<shoeTypes[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState('');
  const [keyboardType, setKeyboardType] = useState('default');
  const [activeItem, setActiveItem] = useState('');
  const navigation = useNavigation();

  const inputRef = useRef();

  const shoePrefixes = useSelector(shoePrefixesSelector);
  const slipperPrefixes = useSelector(slipperPrefixesSelector);
  const colorCodes = useSelector(colorCodesSelector);

  const onReset = () => {
    setProductId('');
    setPropductsMatch([]);
    setKeyboardType('default');
    setActiveItem('');
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
      const searchProductApi =
        productTarget === 'shoe' ? searchShoesApi : searchSlippersApi;
      const productsList = await searchProductApi(productId);
      setPropductsMatch(productsList as shoeTypes[]);
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
    setActiveItem(prefix);
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
    setActiveItem(code);
    if (true) {
      setProductId(`${productId.split('-')[0]}${code}`);
    }
  };

  const onGoToSettings = (targetTab) => {
    onClose();
    navigation.navigate('settings_stack', {
      screen: 'settings_screen',
      params: { targetTab },
    });
  };

  return (
    <Block absolute right="20px" bottom="40px">
      <Touchable
        w="60px"
        h="60px"
        borderRadius="30px"
        center
        middle
        shadow
        onPress={onOpen}>
        <Image source={require('@assets/images/search.png')} />
      </Touchable>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}>
        <Modal
          isVisible={visible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropColor={theme.color.neutral8}
          onBackButtonPress={onClose}
          onBackdropPress={onClose}
          backdropOpacity={0.6}
          style={{ margin: 0, justifyContent: 'flex-end' }}>
          <Block h={windowHeight / 2} borderRadius="15px" bg="#1D2636">
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
            <Block h="0.5px" block bg={theme.color.primaryLight} />
            <Input
              ref={inputRef}
              m="20px"
              placeholder="Nhập mã"
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
              data={propductsMatch}
              renderItem={({ item }: { item: shoeTypes }) => (
                <Option
                  item={item}
                  onClose={onClose}
                  productTarget={productTarget}
                />
              )}
              keyExtractor={(item: shoeTypes) => item.shoeId}
            />

            {productTarget === 'shoe' ? (
              <>
                <Block h="0.5px" block bg={theme.color.primaryLight} />
                <Block row>
                  <HideOption
                    style={{ flex: 1 }}
                    itemTarget={activeItem}
                    items={shoePrefixes.map((item) => item.name)}
                    setString={setPrefixProductId}
                  />
                  <Touchable
                    flex={0.1}
                    m="5px"
                    bg="success"
                    center
                    middle
                    borderRadius="5px"
                    onPress={() => onGoToSettings('Tiền tố mã giày')}>
                    <Icon
                      name="add"
                      type="ionicons"
                      color={theme.color.white}
                    />
                  </Touchable>
                </Block>
                <Block h="0.5px" block bg={theme.color.primaryLight} />
              </>
            ) : (
              <>
                <Block h="0.5px" block bg={theme.color.primaryLight} />
                <Block row>
                  <HideOption
                    style={{ flex: 1 }}
                    itemTarget={activeItem}
                    items={slipperPrefixes.map((item) => item.name)}
                    setString={setPrefixProductId}
                  />
                  <Touchable
                    flex={0.1}
                    m="5px"
                    bg="success"
                    center
                    middle
                    borderRadius="5px"
                    onPress={() => onGoToSettings('Tiền tố mã dép')}>
                    <Icon
                      name="add"
                      type="ionicons"
                      color={theme.color.white}
                    />
                  </Touchable>
                </Block>
                <Block h="0.5px" block bg={theme.color.primaryLight} />
              </>
            )}
            <Block row>
              <HideOption
                style={{ flex: 1 }}
                items={colorCodes.map((item) => item.name)}
                itemTarget={activeItem}
                setString={setColorCodeProductId}
              />
              <Touchable
                flex={0.1}
                m="5px"
                bg="success"
                center
                middle
                borderRadius="5px"
                onPress={() => onGoToSettings('Mã màu')}>
                <Icon name="add" type="ionicons" color={theme.color.white} />
              </Touchable>
            </Block>
          </Block>
        </Modal>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default SearchModal;
