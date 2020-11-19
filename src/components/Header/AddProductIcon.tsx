import React from 'react';
import TouchableOpacity from '../Touchable';
import styled from 'styled-components';

//@ts-ignore
const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const AddProductIcon = ({ navigation, fromScreen }: any) => {
  const goToAddProdct = () => {
    if (fromScreen === 'shoes') {
      navigation.navigate('action_shoe_screen', { type: 'add' });
    } else {
      navigation.navigate('action_slipper_screen', { type: 'add' });
    }
  };
  return (
    <TouchableOpacity m="0 20px 0 0" onPress={goToAddProdct}>
      <Image source={require('@assets/images/add.png')} />
    </TouchableOpacity>
  );
};

export default AddProductIcon;
