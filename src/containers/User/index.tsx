//@ts-nocheck
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Block,
  Body,
  Button,
  ScrollBody,
  Text,
  Touchable,
  Icon,
} from '~/components';
import theme from '~/config/theme';

import { setToken } from '~/modules/Auth/actions';
import { showAlert } from '~/utils';
import useAuthencation from '~/hoocks/useAuthentication';
import { profileSelector } from '~/modules/User/selectors';
import styled from 'styled-components';
import { Alert } from 'react-native';

const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

const User = ({ navigation }) => {
  useAuthencation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  const onLogOut = async () => {
    setLoading(true);
    try {
      // await logOutApi();
      Alert.alert(
        'Đăng xuất tài khoản',
        'Bạn có chắc chắn ?',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(
                setToken({
                  token: '',
                }),
              );
            },
          },
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
          },
        ],
        { cancelable: true },
      );
    } catch (e) {
      showAlert('Thông báo', e.message);
    }
    setLoading(false);
  };
  return (
    <Body flex={1} keybordAvoid overlay loading={loading}>
      <ScrollBody>
        <Block h="1px" block bg={theme.color.primaryLight} />
        <Touchable
          row
          middle
          bg="blue1"
          p="12px 10px"
          // onPress={() => onGoToProductTypes('Loại dép')}
        >
          <Block row flex={1}>
            <Image source={require('@assets/images/profile.png')} />
            <Block m="0 0 0 20px">
              <Text color={theme.color.white} s2>
                Xin chào
              </Text>
              <Text color={theme.color.white} h4 m="5px 0 0">
                {profile.phoneNumber}
              </Text>
            </Block>
          </Block>
          <Icon
            m="0 20px 0 0"
            name="chevron-small-right"
            type="entypo"
            size={25}
            color={theme.color.grayLight}
          />
        </Touchable>

        <Block h="1px" block bg={theme.color.primaryLight} m="10px 0 0" />
        <Touchable
          row
          middle
          bg="blue1"
          p="12px 10px"
          // onPress={() => onGoToProductTypes('Loại dép')}
        >
          <Block row flex={1}>
            <Icon
              m="0 20px 0 0"
              name="microsoft-xbox-controller-menu"
              type="materialCommunityIcons"
              size={25}
              color={theme.color.grayLight}
            />
            <Text color={theme.color.white} s2>
              Yêu cầu chức năng
            </Text>
          </Block>
          <Icon
            m="0 20px 0 0"
            name="chevron-small-right"
            type="entypo"
            size={25}
            color={theme.color.grayLight}
          />
        </Touchable>
        <Block h="1px" block bg={theme.color.primaryLight} />
        <Touchable
          row
          middle
          bg="blue1"
          p="12px 10px"
          // onPress={() => onGoToProductTypes('Loại dép')}
        >
          <Block row flex={1}>
            <Icon
              m="0 20px 0 0"
              name="microsoft-xbox-controller-menu"
              type="materialCommunityIcons"
              size={25}
              color={theme.color.grayLight}
            />
            <Text color={theme.color.white} s2>
              Yêu cầu cấp quyền
            </Text>
          </Block>
          <Icon
            m="0 20px 0 0"
            name="chevron-small-right"
            type="entypo"
            size={25}
            color={theme.color.grayLight}
          />
        </Touchable>
        <Block h="1px" block bg={theme.color.primaryLight} />
        <Touchable
          row
          middle
          bg="blue1"
          p="12px 10px"
          // onPress={() => onGoToProductTypes('Loại dép')}
        >
          <Block row flex={1}>
            <Icon
              m="0 20px 0 0"
              name="microsoft-xbox-controller-menu"
              type="materialCommunityIcons"
              size={25}
              color={theme.color.grayLight}
            />
            <Text color={theme.color.white} s2>
              Báo lỗi
            </Text>
          </Block>
          <Icon
            m="0 20px 0 0"
            name="chevron-small-right"
            type="entypo"
            size={25}
            color={theme.color.grayLight}
          />
        </Touchable>
        <Block h="1px" block bg={theme.color.primaryLight} />
      </ScrollBody>
      <Button
        bg="primary"
        m="20px 20px 40px"
        p="10px"
        center
        middle
        onPress={onLogOut}>
        <Text color={theme.color.danger}>Đăng xuất</Text>
      </Button>
    </Body>
  );
};

export default User;
