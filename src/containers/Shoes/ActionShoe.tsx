import React, { useEffect } from 'react';
import { ScrollView, ToastAndroid } from 'react-native';
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

import { GATEGORIES } from '~/config/constants';
import { updateShoeCreator, addShoeCreator } from '~/modules/shoes/thunk';
import {
  addShoeLoadingSelector,
  updateShoeLoadingSelector,
} from '~/modules/shoes/selector';
import { showAlert } from '~/utils';
import { deleteShoeLoadingSelector } from '~/modules/Slippers/selector';

const ActionShoe = ({ navigation, route }: any) => {
  const [data, setData] = useSetObjectState({
    shoeId: '',
    imageUri: '',
    type: 'Hunter',
    like: false,
  });

  const dispatch = useDispatch();
  const updateShoesLoading = useSelector(updateShoeLoadingSelector);
  const addShoesLoading = useSelector(addShoeLoadingSelector);
  const deleteShoesLoading = useSelector(deleteShoeLoadingSelector);

  useEffect(() => {
    if (route.params?.shoeDetail?.shoeId) {
      setData({ ...route.params.shoeDetail });
    }
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
            showAlert('Có lỗi xẩy ra', e);
          },
        }),
      );
    } else if (route.params.type === 'update') {
      dispatch(
        updateShoeCreator({
          shoe: data,
          onSuccess: () => {
            ToastAndroid.show('Cập nhật thành công !', ToastAndroid.SHORT);
          },
          onError: (e: string) => {
            showAlert('Có lỗi xẩy ra', e);
          },
        }),
      );
    }
  };

  const formIsValid = () => {
    return data.shoeId && data.imageUri;
  };

  return (
    <Body
      flex={1}
      overlay
      loading={updateShoesLoading || addShoesLoading || deleteShoesLoading}>
      <ScrollView>
        <ImagePicker
          imageUri={data.imageUri}
          setData={setData}
          type={route.params?.type}
        />

        <Block p="30px 20px 20px">
          <Input
            label="Mã giầy"
            required
            placeholder="Nhập mã giầy"
            value={data.shoeId}
            disabled={route.params.type === 'update'}
            iconLeftName="tago"
            iconLeftType="antDesign"
            onChangeText={(val: string) => setData({ shoeId: val })}
          />
          <Picker
            label="Dòng sản phẩm"
            title="Dòng sản phẩm"
            options={GATEGORIES}
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
        onPress={onActionShoe}>
        <Text color={!formIsValid() ? theme.color.gray : theme.color.secondary}>
          {route.params.type === 'add' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
        </Text>
      </Button>
    </Body>
  );
};

export default ActionShoe;
