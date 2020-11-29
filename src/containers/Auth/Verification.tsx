/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  Block,
  Body,
  Button,
  Text,
  Touchable,
  Icon,
  LinearGradient,
} from '~/components';

import { setToken } from '~/modules/Auth/actions';

import theme from '~/config/theme';
import {
  confirmFirebasePhoneAuthToGetToken,
  getFirebasePhoneAuthVerificationCode,
  getIdToken,
} from '~/modules/Auth/apis';
import { showAlert } from '~/utils';
import { translateFirebaseMessage } from '~/utils/translate';
import CodeInput from './components/CodeInput';
import useAuthencation from '~/hoocks/useAuthentication';
import { profileSelector } from '~/modules/User/selectors';
import { useTimeout } from '~/hoocks';

const Image = styled.Image.attrs({})`
  width: 80px;
  height: 80px;
`;

const Verification = ({ navigation, route }) => {
  const [user] = useAuthencation();
  const [verificationCode, setCode] = useState('');
  const [confirmResult, setConfirmResult] = useState('');
  const [resendTime, setResendTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  // useEffect(() => {
  //   if (user && user.phoneNumber === profile.phoneNumber) {
  //     doAction();
  //   }
  // }, []);

  useEffect(() => {
    if (route.params?.confirmResult) {
      setConfirmResult(route.params?.confirmResult);
    }
  }, [route.params?.confirmResult]);

  useEffect(() => {
    if (verificationCode.length === 6) {
      onConfirmCode();
    }
  }, [verificationCode]);

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

  const reSendOTP = async () => {
    setLoading(true);
    try {
      const response = await getFirebasePhoneAuthVerificationCode(
        profile.phoneNumber,
      );
      if (response) {
        setConfirmResult(response);
        setResendTime(120);
        const countDown = setInterval(() => {
          console.log('object');
          setResendTime((time) => {
            if (time > 0) {
              return time - 1;
            } else {
              clearInterval(countDown);
              return 0;
            }
          });
        }, 1000);
      } else {
        showAlert('Thông báo!', response.toString());
      }
    } catch (e) {
      showAlert('Thông báo', translateFirebaseMessage(e.message) || e.message);
    }
    setLoading(false);
  };
  return (
    <Body flex={1} overlay loading={loading}>
      <LinearGradient flex={1} center block>
        <Block>
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
            <Text m="0 0 0 20px" h1 color={theme.color.white}>
              Xác thục OTP
            </Text>
          </Block>
        </Block>

        <Block center flex={1} justify="flex-start">
          <CodeInput
            value={verificationCode}
            onChangeText={setCode}
            // autoFocus
          />
          {resendTime ? (
            <Text center m="20px 0 0" color={theme.color.white}>
              {`Mã sẽ được gửi đến sau:  `}
              <Text color={theme.color.secondary}> {`${resendTime}s`}</Text>
            </Text>
          ) : (
            <Block row center middle m="20px 0 0">
              <Text center color={theme.color.white}>
                Không nhận được mã xác nhận ?{' '}
              </Text>
              <Touchable onPress={reSendOTP}>
                <Text color={theme.color.secondary}>Gửi lại</Text>
              </Touchable>
            </Block>
          )}
        </Block>
        <Button
          bg={theme.color.blue1}
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
      </LinearGradient>
    </Body>
  );
};

export default Verification;
