import React from 'react';
import TouchableOpacity from '../Touchable';
import styled from 'styled-components';

//@ts-ignore
const Image = styled.Image`
  width: 22px;
  height: 22px;
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
