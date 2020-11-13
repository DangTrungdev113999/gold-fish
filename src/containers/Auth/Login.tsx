//@ts-nocheck

import React from 'react';
import { Body, Button, Input, Text } from '~/components';
import theme from '~/config/theme';

const Login = () => {
  return (
    <Body center flex={1}>
      <Input
        m="20px 20px 0"
        required
        label="Số điện thoại"
        placeholder="Nhập số điện thoại"
        // value={data.name}
        // onChangeText={(val: string) => setData({ name: val })}
      />
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

export default Login;
