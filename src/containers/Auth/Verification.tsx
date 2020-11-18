/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

import { setToken } from '~/modules/Auth/actions';

import theme from '~/config/theme';
import {
  confirmFirebasePhoneAuthToGetToken,
  getIdToken,
} from '~/modules/Auth/apis';
import { showAlert } from '~/utils';
import { translateFirebaseMessage } from '~/utils/translate';
import CodeInput from './components/CodeInput';
import useAuthencation from '~/hoocks/useAuthentication';
import { profileSelector } from '~/modules/User/selectors';

const Image = styled.Image.attrs({})`
  width: 80px;
  height: 80px;
`;

const Verification = ({ navigation, route }) => {
  const [user] = useAuthencation();
  const [verificationCode, setCode] = useState('');
  const [confirmResult, setConfirmResult] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  useEffect(() => {
    if (user && user.phoneNumber === profile.phoneNumber) {
      doAction();
    }
  }, []);

  useEffect(() => {
    if (route.params?.confirmResult) {
      setConfirmResult(route.params?.confirmResult);
    }
  }, [route.params?.confirmResult]);

  const onConfirmCode = async () => {
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
      doAction();
    } catch (e) {
      showAlert('Thông báo', translateFirebaseMessage(e.message) || e.message);
    }
    setLoading(false);
  };

  const doAction = async () => {
    setLoading(true);
    const response = await getIdToken();
    dispatch(
      setToken({
        token: response.token,
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    if (verificationCode.length === 6) {
      onConfirmCode();
    }
  }, [verificationCode]);

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
          m="20px 20px 40px"
          p="10px 0"
          center
          middle
          onPress={onConfirmCode}
          disabled={verificationCode.length < 6}>
          <Text
            color={
              verificationCode.length < 6
                ? theme.color.grayLight
                : theme.color.secondary
            }>
            Tiếp Tục
          </Text>
        </Button>
      </Block>
    </Body>
  );
};

export default Verification;
