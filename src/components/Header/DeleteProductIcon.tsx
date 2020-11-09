import React from 'react';
import TouchableOpacity from '../Touchable';
import Icon from '../Icon';
import { useDispatch } from 'react-redux';
import theme from '~/config/theme';
import { Alert } from 'react-native';
import { showAlert } from '~/utils';
import { deleteShoeCreator } from '~/modules/shoes/thunk';

const DeleteProductIcon = ({ navigation, route }: any) => {
  const dispatch = useDispatch();

  const onPress = async () => {
    Alert.alert(
      `#${route.params.shoeDetail.shoeId}`,
      'Bạn có chắc muốn xóa sản phẩm này ?',
      [
        {
          text: 'OK',
          onPress: () => onDeleteProduct(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const onDeleteProduct = async () => {
    dispatch(
      deleteShoeCreator({
        shoe: route.params.shoeDetail,
        onSuccess: () => {
          navigation.navigate('shoes_screen');
        },
        onError: (e: string) => {
          showAlert('Có lỗi xẩy ra', e);
        },
      }),
    );
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
