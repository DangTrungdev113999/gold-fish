//@ts-nocheck
import React from 'react';
import { Block, Body, Button, Text } from '~/components';
import theme from '~/config/theme';

const Welcome = ({ navigation }) => {
  const onGotoLogin = () => {
    navigation.navigate('login_screen');
  };
  return (
    <Body center flex={1}>
      <Block flex={1} block justify="flex-end">
        <Text center m="0 0 200px">
          Chỗ này sẽ nội dung intro
        </Text>
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
