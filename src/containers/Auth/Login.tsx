//@ts-nocheck
import React, { useEffect, useState } from 'react';
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
import {
  isPhoneNumber,
  removePhoneCountryPrefix,
  showAlert,
  parsePhone,
} from '~/utils';
import { getFirebasePhoneAuthVerificationCode } from '~/modules/Auth/apis';
import { translateFirebaseMessage } from '~/utils/translate';
import { savePhoneNumber } from '~/modules/User/actions';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '~/modules/User/selectors';

const Image = styled.Image.attrs({})`
  width: 80px;
  height: 80px;
`;

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const [phoneNumber, setPhoneNumber] = useState(
    removePhoneCountryPrefix(profile.phoneNumber),
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

    dispatch(savePhoneNumber({ phoneNumber: parsePhone(phoneNumber) }));
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

  const isButtonDisable = () => {
    return phoneIsValid && isPhoneNumber(phoneNumber);
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
          disabled={!isButtonDisable()}
          onPress={onGotoConfirmCode}>
          <Text
            color={
              !isButtonDisable() ? theme.color.grayLight : theme.color.secondary
            }>
            Tiếp Tục
          </Text>
        </Button>
      </Block>
    </Body>
  );
};

export default Login;
