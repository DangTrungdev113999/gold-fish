/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  Block,
  Button,
  Input,
  Picker,
  Text,
  ImagePicker,
  Body,
  ScrollBody,
} from '~/components';
import theme from '~/config/theme';
import { useSetObjectState } from '~/hoocks';

import { updateShoeCreator, addShoeCreator } from '~/modules/Shoes/thunk';
import {
  addShoeLoadingSelector,
  updateShoeLoadingSelector,
} from '~/modules/Shoes/selectors';
import { isShoeId, showAlert } from '~/utils';
import { deleteShoeLoadingSelector } from '~/modules/Shoes/selectors';
import { shoeTypesSelector } from '~/modules/Settings/selectors';
import { profileSelector } from '~/modules/User/selectors';
const ActionShoe = ({ navigation, route }: any) => {
  const profile = useSelector(profileSelector);
  const [data, setData] = useSetObjectState({
    shoeId: '',
    userId: profile.phoneNumber,
    imageUri: '',
    type: 'Hunter',
    like: false,
  });

  const [shoeIdIsValid, setShoeIdIsValid] = useState(true);

  const dispatch = useDispatch();
  const updateShoesLoading = useSelector(updateShoeLoadingSelector);
  const addShoesLoading = useSelector(addShoeLoadingSelector);
  const deleteShoesLoading = useSelector(deleteShoeLoadingSelector);
  const shoeTypes = useSelector(shoeTypesSelector);
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
    if (route.params?.shoeDetail?.shoeId) {
      setData({ ...route.params.shoeDetail });
    }

    return () => {
      setData({
        shoeId: '',
        imageUri: '',
        type: 'Hunter',
      });
    };
  }, [route.params?.shoeDetail?.shoeId]);

  const onActionShoe = async () => {
    if (route.params.type === 'add') {
      dispatch(
        addShoeCreator({
          shoe: data,
          onSuccess: () => {
            navigation.navigate('shoes_screen');
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
            setData({
              shoeId: '',
              imageUri: '',
              type: 'Hunter',
              like: false,
            });
          },
        }),
      );
    } else if (route.params.type === 'update') {
      dispatch(
        updateShoeCreator({
          shoe: data,
          onSuccess: () => {
            Toast.show('Cập nhật thành công !');
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
          },
        }),
      );
    }
  };

  const checkShoeId = () => {
    const result = isShoeId(data.shoeId);
    setShoeIdIsValid(result);
  };

  const onSetShoeId = (shoeId: string) => {
    if (shoeId.length > 12) {
      Keyboard.dismiss();
    }
    setData({ shoeId });
  };

  const formIsValid = () => {
    return isShoeId(data.shoeId) && data.imageUri;
  };

  return (
    <Body
      flex={1}
      keybordAvoid
      overlay
      loading={updateShoesLoading || addShoesLoading || deleteShoesLoading}>
      <ScrollBody ref={scrollViewRef}>
        <ImagePicker
          imageUri={data.imageUri}
          setData={setData}
          fromScreen="action_shoe"
        />
        <Block p="30px 20px 20px" flex={1}>
          <Input
            label="Mã giày"
            required
            placeholder="Nhập mã giày"
            value={data.shoeId}
            disabled={route.params.type === 'update'}
            iconLeftName="tago"
            iconLeftType="antDesign"
            autoCapitalize="characters"
            onChangeText={onSetShoeId}
            description={!shoeIdIsValid ? 'Mã giày không đúng định dạng' : ''}
            danger={!shoeIdIsValid}
            onBlur={checkShoeId}
            maxLength={13}
          />
          <Picker
            label="Dòng sản phẩm"
            title="Dòng sản phẩm"
            options={shoeTypes
              .map((item) => ({
                name: item.name,
                value: item.name,
              }))
              .slice(1)}
            placeholder="Chọn dòng sản phẩm"
            value={data.type}
            onChange={(val: string) => setData({ type: val })}
            m="20px 0 0"
          />
        </Block>
      </ScrollBody>

      <Button
        bg="primary"
        m="20px"
        p="10px 0"
        center
        middle
        disabled={!formIsValid()}
        onPress={onActionShoe}>
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

export default ActionShoe;
