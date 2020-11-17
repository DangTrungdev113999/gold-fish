//@ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { Block, Body, Button, Text } from '~/components';
import theme from '~/config/theme';
import Swipper from './components/Swiper';

const Image = styled.Image.attrs({})`
  width: 200px;
  height: 200px;
`;

const Welcome = ({ navigation }) => {
  const onGotoLogin = () => {
    navigation.navigate('login_screen');
  };
  return (
    <Body center flex={1}>
      <Block flex={1} block justify="flex-end">
        <Block center middle flex={1}>
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
