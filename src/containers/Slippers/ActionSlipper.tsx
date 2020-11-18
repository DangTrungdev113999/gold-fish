/* eslint-disable prettier/prettier */
//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Block,
  Button,
  Input,
  Picker,
  Text,
  ImagePicker,
  Body,
} from '~/components';
import theme from '~/config/theme';
import { useSetObjectState } from '~/hoocks';

import { SLIPPER_TYPES } from '~/config/constants';
import {
  updateSlipperCreator,
  addSlipperCreator,
} from '~/modules/Slippers/thunk';
import {
  addSlipperLoadingSelector,
  updateSlipperLoadingSelector,
} from '~/modules/Slippers/selectors/';
import { isSlipperId, showAlert } from '~/utils';
import { deleteSlipperLoadingSelector } from '~/modules/Slippers/selectors/';
import { profileSelector } from '~/modules/User/selectors';

const ActionSlipper = ({ navigation, route }: any) => {
  const profile = useSelector(profileSelector);
  const [data, setData] = useSetObjectState({
    slipperId: '',
    usrId: profile.phoneNumber,
    imageUri: '',
    type: '',
    like: false,
  });

  const [slipperIdIsValid, setSlipperIdIsValid] = useState(true);

  const dispatch = useDispatch();
  const updateSlippersLoading = useSelector(addSlipperLoadingSelector);
  const addSlippersLoading = useSelector(updateSlipperLoadingSelector);
  const deleteSlippersLoading = useSelector(deleteSlipperLoadingSelector);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
    };
  }, []);

  const _keyboardDidShow = () => {
    scrollViewRef.current.scrollToEnd({ animated: true, duration: 500 });
  };

  useEffect(() => {
    if (route.params?.slipperDetail?.slipperId) {
      setData({ ...route.params.slipperDetail });
    }

    return () => {
      setData({
        slipperId: '',
        imageUri: '',
        type: '',
        like: false,
      });
    };
  }, [route.params?.slipperDetail?.slipperId]);

  const onActionSlipper = async () => {
    if (route.params.type === 'add') {
      dispatch(
        addSlipperCreator({
          slipper: data,
          onSuccess: () => {
            navigation.navigate('slippers_screen');
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
            setData({
              slipperId: '',
              imageUri: '',
              type: '',
              like: false,
            });
          },
        }),
      );
    } else if (route.params.type === 'update') {
      dispatch(
        updateSlipperCreator({
          slipper: data,
          onSuccess: () => {
            ToastAndroid.show('Cập nhật thành công !', ToastAndroid.SHORT);
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
          },
        }),
      );
    }
  };

  const checkSlipperId = () => {
    const result = isSlipperId(data.slipperId);
    setSlipperIdIsValid(result);
  };

  const onSetSlipperId = (slipperId: string) => {
    if (slipperId.length > 12) {
      Keyboard.dismiss();
    }
    setData({ slipperId });
  };

  const formIsValid = () => {
    return isSlipperId(data.slipperId) && data.imageUri;
  };

  return (
    <Body
      flex={1}
      overlay
      loading={
        updateSlippersLoading || addSlippersLoading || deleteSlippersLoading
      }>
      <ScrollView ref={scrollViewRef}>
        <ImagePicker
          imageUri={data.imageUri}
          setData={setData}
          fromScreen="action_slipper"
        />

        <Block p="30px 20px 20px">
          <Input
            label="Mã dép"
            required
            placeholder="Nhập mã dép"
            value={data.slipperId}
            disabled={route.params.type === 'update'}
            iconLeftName="tago"
            iconLeftType="antDesign"
            autoCapitalize="characters"
            onChangeText={onSetSlipperId}
            description={!slipperIdIsValid ? 'Mã dép không đúng định dạng' : ''}
            danger={!slipperIdIsValid}
            onBlur={checkSlipperId}
            maxLength={15}
          />
          <Picker
            label="Dòng sản phẩm"
            title="Dòng sản phẩm"
            options={SLIPPER_TYPES}
            placeholder="Chọn dòng sản phẩm"
            value={data.type}
            onChange={(val: string) => setData({ type: val })}
            m="20px 0 0"
          />
        </Block>
      </ScrollView>

      <Button
        bg="primary"
        m="20px"
        p="10px 0"
        center
        middle
        disabled={!formIsValid()}
        onPress={onActionSlipper}>
        <Text
          color={
            !formIsValid() ? theme.color.grayLight : theme.color.secondary
          }>
          {route.params.type === 'add' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
        </Text>
      </Button>
    </Body>
  );
};

export default ActionSlipper;
