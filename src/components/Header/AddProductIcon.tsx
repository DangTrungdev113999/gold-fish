import React from 'react';
import TouchableOpacity from '../Touchable';
import styled from 'styled-components';
import { showAlert } from '~/utils';
import { useSelector } from 'react-redux';
import { ruleUserSelector } from '~/modules/User/selectors';

//@ts-ignore
const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const AddProductIcon = ({ navigation, fromScreen }: any) => {
  const rule = useSelector(ruleUserSelector);
  const goToAddProdct = () => {
    if (!['admin', 'leader', 'staff'].includes(rule)) {
      showAlert('Thông báo', `Bạn chưa được cấp quyền để thêm sảm phẩm`);
      return;
    }
    if (fromScreen === 'shoes') {
      navigation.navigate('action_shoe_screen', { type: 'add' });
    } else {
      navigation.navigate('action_slipper_screen', { type: 'add' });
    }
  };
  return (
    <TouchableOpacity m="0 15px 0 0" onPress={goToAddProdct}>
      <Image source={require('@assets/images/add.png')} />
    </TouchableOpacity>
  );
};

export default AddProductIcon;
