/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import { shoeTypes } from '~/@types';
import {
  Block,
  Body,
  Button,
  Icon,
  Input,
  Loading,
  ScrollBody,
  Text,
  Touchable,
} from '~/components';
import theme from '~/config/theme';

type PropsType = {
  target: string;
};

const SearchModal = ({ target }: PropsType) => {
  const [propductsMatch, setPropductsMatch] = useState<shoeTypes[]>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState('');

  const inputRef = useRef();

  const onReset = () => {
    setProductId('');
    setPropductsMatch([]);
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

  useEffect(() => {}, []);

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
        <Icon
          name="add"
          type="ionicons"
          size={30}
          color={theme.color.secondary}
        />
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
        <Block h="450px" borderRadius="15px" bg="#1D2636">
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
          <ScrollBody flex={1} bg="#1D2636">
            <Input
              ref={inputRef}
              required
              label={`Nhập ${target}`}
              m="20px 20px 0"
              placeholder={`Nhập ${target}`}
              autoCapitalize="characters"
              value={productId}
              onChangeText={(val: string) => setProductId(val)}
            />
            <Input
              ref={inputRef}
              label="Mô tả"
              m="20px 20px 0"
              placeholder="Mô tả"
              autoCapitalize="characters"
              value={productId}
              onChangeText={(val: string) => setProductId(val)}
            />
          </ScrollBody>

          <Button
            bg="primary"
            m="20px"
            p="10px 0"
            center
            middle
            // disabled={!formIsValid()}
            //           onPress={onActionShoe}
          >
            <Text color={!true ? theme.color.grayLight : theme.color.secondary}>
              Thêm
            </Text>
          </Button>
        </Block>
      </Modal>
    </Block>
  );
};

export default SearchModal;
