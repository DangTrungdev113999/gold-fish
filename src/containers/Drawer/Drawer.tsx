//@ts-nocheck
import React from 'react';
import styled from 'styled-components';
import {
  Block,
  Text,
  Body,
  ScrollBody,
  Touchable,
  Icon,
  LinearGradient,
} from '~/components';
import theme from '~/config/theme';

const IconLeft = styled.Image`
  width: 25px;
  height: 25px;
  margin-right: 20px;
`;

const Drawer = ({ navigation }) => {
  const onCloseDrawer = () => navigation.closeDrawer();

  const onGoToProductTypes = (targetTab) => {
    navigation.navigate('settings_stack', {
      screen: 'settings_screen',
      params: { targetTab },
    });
  };

  return (
    <Body flex={1}>
      <ScrollBody flex={1}>
        <LinearGradient flex={1}>
          <Touchable
            row
            justify="flex-end"
            onPress={onCloseDrawer}
            m="25px 0 0">
            <Icon
              m="0 10px 0 0"
              name="ios-close-outline"
              type="ionicons"
              size={30}
              color={theme.color.white}
            />
          </Touchable>

          <Touchable row middle m="10px 0" p="12px 10px">
            <IconLeft source={require('@assets/images/coding-1.png')} />
            <Text color={theme.color.white}>Giới thiệu</Text>
          </Touchable>
          <Block h="0.3px" m="10px 0 " block bg={theme.color.grayLight} />

          <Block row middle m="0 0 0 12px">
            <Icon
              m="0 10px 0 0"
              name="setting"
              type="antDesign"
              size={15}
              color={theme.color.neutral7}
            />
            <Text color={theme.color.neutral7}>Cài đặt</Text>
          </Block>

          <Touchable
            row
            middle
            m="10px 0 0"
            bg={theme.color.secondarylight1}
            p="12px 10px"
            onPress={() => onGoToProductTypes('Loại giày')}>
            <IconLeft source={require('@assets/images/shoes-icon-2.png')} />
            <Text color={theme.color.white}>Loại giày</Text>
          </Touchable>

          <Block h="1px" block bg={theme.color.grayLight} />

          <Touchable
            row
            middle
            bg={theme.color.secondarylight1}
            p="12px 10px"
            onPress={() => onGoToProductTypes('Loại dép')}>
            <IconLeft source={require('@assets/images/slippers-icon-1.png')} />
            <Text color={theme.color.white}>Loại dép</Text>
          </Touchable>

          <Block h="1px" block bg={theme.color.grayLight} />

          <Touchable
            row
            middle
            bg={theme.color.secondarylight1}
            p="12px 10px"
            onPress={() => onGoToProductTypes('Tiền tố mã giày')}>
            <IconLeft source={require('@assets/images/list.png')} />
            <Text color={theme.color.white}>Tiền tố mã giày</Text>
          </Touchable>

          <Block h="1px" block bg={theme.color.grayLight} />

          <Touchable
            row
            middle
            bg={theme.color.secondarylight1}
            p="12px 10px"
            onPress={() => onGoToProductTypes('Tiền tố mã dép')}>
            <IconLeft source={require('@assets/images/list.png')} />
            <Text color={theme.color.white}>Tiền tố mã dép</Text>
          </Touchable>

          <Block h="1px" block bg={theme.color.grayLight} />

          <Touchable
            row
            middle
            bg={theme.color.secondarylight1}
            p="12px 10px"
            onPress={() => onGoToProductTypes('Mã màu')}>
            <IconLeft source={require('@assets/images/rec-1.png')} />
            <Text color={theme.color.white}>Mã màu</Text>
          </Touchable>
        </LinearGradient>
      </ScrollBody>
    </Body>
  );
};

export default Drawer;
