//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Block, Body, Button, Text } from '~/components';
import theme from '~/config/theme';

import { setToken } from '~/modules/Auth/actions';
import { logOutApi } from '~/modules/Auth/apis';
import { showAlert } from '~/utils';
import useAuthencation from '~/hoocks/useAuthentication';

const User = ({ navigation }) => {
  useAuthencation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onLogOut = async () => {
    setLoading(true);
    try {
      // await logOutApi();
      dispatch(
        setToken({
          token: '',
        }),
      );
    } catch (e) {
      showAlert('Thông báo', e.message);
    }
    setLoading(false);
  };
  return (
    <Body center flex={1} keybordAvoid overlay loading={loading}>
      <Block flex={1} block justify="flex-end">
        <Text center m="0 0 200px">
          Chỗ này là nội dung user
        </Text>
        <Button
          bg="primary"
          m="20px 20px 40px"
          p="10px"
          center
          middle
          onPress={onLogOut}>
          <Text color={theme.color.danger}>Đăng xuất</Text>
        </Button>
      </Block>
    </Body>
  );
};

export default User;
