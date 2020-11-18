//@ts-nocheck
import React from 'react';
import { Block, Body, Button, Text } from '~/components';
import theme from '~/config/theme';
import Swipper from './components/Swiper';

const Welcome = ({ navigation }) => {
  const onGotoLogin = () => {
    navigation.navigate('login_screen');
  };
  return (
    <Body center flex={1}>
      <Block flex={1} block justify="flex-end">
        <Block flex={1}>
          <Swipper />
        </Block>
        <Button
          bg="primary"
          m="20px 20px 40px"
          p="10px"
          center
          middle
          onPress={onGotoLogin}>
          <Text color={theme.color.secondary}>
            Đăng nhập bằng số điện thoại
          </Text>
        </Button>
      </Block>
    </Body>
  );
};

export default Welcome;
