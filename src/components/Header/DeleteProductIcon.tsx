import React from 'react';
import TouchableOpacity from '../Touchable';
import Toast from 'react-native-simple-toast';
import Icon from '../Icon';
import { useDispatch } from 'react-redux';
import theme from '~/config/theme';
import { Alert } from 'react-native';
import { showAlert } from '~/utils';
import { deleteShoeCreator } from '~/modules/Shoes/thunk';
import { deleteSlipperCreator } from '~/modules/Slippers/thunk';

const DeleteProductIcon = ({ navigation, route, fromScreen }: any) => {
  const dispatch = useDispatch();

  const onPress = async () => {
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
      <Icon
        type="antDesign"
        name="delete"
        size={25}
        color={theme.color.danger}
      />
    </TouchableOpacity>
  );
};

export default DeleteProductIcon;
