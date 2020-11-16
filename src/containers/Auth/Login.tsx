//@ts-nocheck

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Block,
  Body,
  Button,
  Input,
  ScrollBody,
  Text,
  Touchable,
  Icon,
} from '~/components';
import theme from '~/config/theme';
import { isPhoneNumber, removePhoneCountryPrefix, showAlert } from '~/utils';
import { getFirebasePhoneAuthVerificationCode } from '~/modules/Auth/apis';
import { translateFirebaseMessage } from '~/utils/translate';

const Image = styled.Image.attrs({})`
  width: 80px;
  height: 80px;
`;

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState(
    removePhoneCountryPrefix('0328579282'),
  );
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const checkPhoneNumber = () => {
    setPhoneIsValid(isPhoneNumber(phoneNumber));
  };

  const onChangePhoneNumber = (phone) => {
    if (phone.length >= 10) {
      setPhoneIsValid(isPhoneNumber(phone));
    }
    setPhoneNumber(phone);
  };

  const onGotoConfirmCode = async () => {
    setLoading(true);
    try {
      const response = await getFirebasePhoneAuthVerificationCode(phoneNumber);
      if (response) {
        navigation.navigate('verification_screen', {
          confirmResult: response,
        });
      } else {
        showAlert('Thông báo!', response.toString());
      }
    } catch (e) {
      showAlert('Thông báo', translateFirebaseMessage(e.message) || e.message);
    }
    setLoading(false);
  };

  return (
    <Body center flex={1} keyboard overlay loading={loading}>
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
            Đăng nhập
          </Text>
        </Block>

        <ScrollBody center>
          <Input
            m="20px 20px 0"
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            description={
              !phoneIsValid ? 'Số điện thoại không đúng định dạng' : ''
            }
            danger={!phoneIsValid}
            onBlur={checkPhoneNumber}
            value={phoneNumber}
            onChangeText={onChangePhoneNumber}
            selectTextOnFocus
            autoFocus={!phoneNumber}
            disabled={loading}
            maxLength={12}
            returnKeyType="next"
          />
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

export default Login;
