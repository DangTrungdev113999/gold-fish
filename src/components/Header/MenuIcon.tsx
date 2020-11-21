import React from 'react';
import TouchableOpacity from '../Touchable';
import styled from 'styled-components';

//@ts-ignore
const Image = styled.Image`
  width: 20px;
  height: 20px;
`;

const MenuIcon = ({ navigation }: any) => {
  const openDrawer = () => navigation.openDrawer();
  return (
    <TouchableOpacity m="0 0 0 20px" onPress={openDrawer}>
      <Image source={require('@assets/images/menu.png')} />
    </TouchableOpacity>
  );
};

export default MenuIcon;
