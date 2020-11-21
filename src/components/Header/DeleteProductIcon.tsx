import React from 'react';
import TouchableOpacity from '../Touchable';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { showAlert } from '~/utils';
import { deleteShoeCreator } from '~/modules/Shoes/thunk';
import { deleteSlipperCreator } from '~/modules/Slippers/thunk';
import styled from 'styled-components';
import { ruleUserSelector } from '~/modules/User/selectors';

//@ts-ignore
const Image = styled.Image`
  width: 25px;
  height: 25px;
`;

const DeleteProductIcon = ({ navigation, route, fromScreen }: any) => {
  const dispatch = useDispatch();
  const rule = useSelector(ruleUserSelector);

  const onPress = async () => {
    if (!['admin'].includes(rule)) {
      showAlert('Thông báo', 'Xin lỗi, bạn chưa được cấp quyền xóa sản phẩm!');
      return;
    }
    Alert.alert(
      `#${
        route.params?.shoeDetail?.shoeId ||
        route.params?.slipperDetail?.slipperId
      }`,
      'Bạn có chắc muốn xóa sản phẩm này ?',
      [
        {
          text: 'OK',
          onPress: () => onDeleteProduct(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
      { cancelable: true },
    );
  };

  const onDeleteProduct = async () => {
    if (fromScreen === 'action_shoe') {
      dispatch(
        deleteShoeCreator({
          shoe: route.params.shoeDetail,
          onSuccess: () => {
            Toast.show('Xóa sản phấm thành công!');
            navigation.navigate('shoes_screen');
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
          },
        }),
      );
    } else {
      dispatch(
        deleteSlipperCreator({
          slipper: route.params.slipperDetail,
          onSuccess: () => {
            Toast.show('Xóa sản phấm thành công!');
            navigation.navigate('slippers_screen');
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
          },
        }),
      );
    }
  };
  return (
    <TouchableOpacity m="0 20px 0 0" onPress={onPress}>
      <Image source={require('@assets/images/trash.png')} />
    </TouchableOpacity>
  );
};

export default DeleteProductIcon;
