import React from 'react';
import { Body, Button, Text } from '~/components';
import theme from '~/config/theme';

const Welcome = () => {
  return (
    <Body center flex={1}>
      <Button
        bg="primary"
        m="20px"
        p="10px 0"
        center
        middle
        //   onPress={onActionShoe}
      >
        <Text color={theme.color.secondary}>Đăng nhập bằng số điện thoại</Text>
      </Button>
    </Body>
  );
};

export default Welcome;
