/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  Block,
  Body,
  Button,
  ScrollBody,
  Text,
  Touchable,
  Icon,
} from '~/components';

import { setToken } from '~/modules/Auth/actions';

import theme from '~/config/theme';
import {
  confirmFirebasePhoneAuthToGetToken,
  getIdToken,
} from '~/modules/Auth/apis';
import { showAlert } from '~/utils';
import { translateFirebaseMessage } from '~/utils/translate';
import CodeInput from './components/CodeInput';

const Image = styled.Image.attrs({})`
  width: 80px;
  height: 80px;
`;

const Verification = ({ navigation, route }) => {
  const [verificationCode, setCode] = useState('');
  const [confirmResult, setConfirmResult] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params?.confirmResult) {
      setConfirmResult(route.params?.confirmResult);
    }
  }, [route.params?.confirmResult]);

  const onGotoConfirmCode = async () => {
    setLoading(true);
    try {
      const currentUser = await confirmFirebasePhoneAuthToGetToken(
        confirmResult,
        verificationCode,
      );
      if (!currentUser) {
        showAlert('Thông báo!', 'Lỗi kết nối hệ thống. Vui lòng thử lại.');
        throw new Error('Lỗi kết nối hệ thống. Vui lòng thử lại.');
      }
      checkUser(currentUser.additionalUserInfo.isNewUser);
    } catch (e) {
      showAlert('Thông báo', translateFirebaseMessage(e.message) || e.message);
    }
    setLoading(false);
  };

  const checkUser = async (isNewUser) => {
    console.log({ isNewUser });
    const response = await getIdToken();
    dispatch(
      setToken({
        token: response.token,
      }),
    );
  };

  return (
    <Body center flex={1} keybordAvoid overlay loading={loading}>
      <Block block flex={1} center>
        <Touchable m="20% 0 0" p="20px" onPress={() => navigation.goBack()}>
          <Icon
            name="long-arrow-left"
            type="fontAwesome"
            size={25}
            color="#fff"
          />
        </Touchable>

        <Block m="20px 0 0" p="20px" row middle>
          <Image source={require('@assets/images/logo.png')} />
          <Text m="0 0 0 20px" h1 color={theme.color.secondary2}>
            Xác thục OTP
          </Text>
        </Block>

        <ScrollBody center>
          <CodeInput value={verificationCode} onChangeText={setCode} />
        </ScrollBody>
        <Button
          bg="primary"
          m="20px"
          p="10px 0"
          center
          middle
          onPress={onGotoConfirmCode}>
          <Text color={theme.color.secondary}>Tiếp Tục</Text>
        </Button>
      </Block>
    </Body>
  );
};

export default Verification;
