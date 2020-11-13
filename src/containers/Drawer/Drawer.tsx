//@ts-nocheck
import React from 'react';
import { Block, Text, Body, ScrollBody, Touchable, Icon } from '~/components';
import theme from '~/config/theme';

const Drawer = ({ navigation }) => {
  const onCloseDrawer = () => navigation.closeDrawer();

  const onGoToProductTypes = (targetTab) => {
    navigation.navigate('settings_stack', {
      screen: 'settings_screen',
      params: { targetTab },
    });
  };

  return (
    <Body flex={1} bg={theme.color.blue1}>
      <ScrollBody bg={theme.color.blue1}>
        <Touchable row justify="flex-end" onPress={onCloseDrawer} m="25px 0 0">
          <Icon
            m="0 10px 0 0"
            name="ios-close-outline"
            type="ionicons"
            size={30}
            color={theme.color.white}
          />
        </Touchable>

        <Touchable row middle m="10px 0" p="12px 10px">
          <Icon
            m="0 20px 0 0"
            name="dingding"
            type="antDesign"
            size={25}
            color={theme.color.grayLight}
          />
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
          bg="blue2"
          p="12px 10px"
          onPress={() => onGoToProductTypes('Loại giày')}>
          <Icon
            m="0 20px 0 0"
            name="category"
            type="materialIcons"
            size={25}
            color={theme.color.grayLight}
          />
          <Text color={theme.color.white}>Loại giày</Text>
        </Touchable>

        <Block h="1px" block bg={theme.color.primaryLight} />

        <Touchable
          row
          middle
          bg="blue2"
          p="12px 10px"
          onPress={() => onGoToProductTypes('Loại dép')}>
          <Icon
            m="0 20px 0 0"
            name="category"
            type="materialIcons"
            size={25}
            color={theme.color.grayLight}
          />
          <Text color={theme.color.white}>Loại dép</Text>
        </Touchable>

        <Block h="1px" block bg={theme.color.primaryLight} />

        <Touchable
          row
          middle
          bg="blue2"
          p="12px 10px"
          onPress={() => onGoToProductTypes('Tiền tố mã giày')}>
          <Icon
            m="0 20px 0 0"
            name="awareness-ribbon"
            type="entypo"
            size={25}
            color={theme.color.grayLight}
          />
          <Text color={theme.color.white}>Tiền tố mã giày</Text>
        </Touchable>

        <Block h="1px" block bg={theme.color.primaryLight} />

        <Touchable
          row
          middle
          bg="blue2"
          p="12px 10px"
          onPress={() => onGoToProductTypes('Tiền tố mã dép')}>
          <Icon
            m="0 20px 0 0"
            name="awareness-ribbon"
            type="entypo"
            size={25}
            color={theme.color.grayLight}
          />
          <Text color={theme.color.white}>Tiền tố mã dép</Text>
        </Touchable>

        <Block h="1px" block bg={theme.color.primaryLight} />

        <Touchable
          row
          middle
          bg="blue2"
          p="12px 10px"
          onPress={() => onGoToProductTypes('Mã màu')}>
          <Icon
            m="0 20px 0 0"
            name="color-palette-sharp"
            type="ionicons"
            size={25}
            color={theme.color.grayLight}
          />
          <Text color={theme.color.white}>Mã màu</Text>
        </Touchable>
      </ScrollBody>
    </Body>
  );
};

export default Drawer;
