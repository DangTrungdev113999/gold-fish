import React from 'react';
import TouchableOpacity from '../Touchable';
import Icon from '../Icon';
import theme from '~/config/theme';

const MenuIcon = ({ navigation }: any) => {
  const openDrawer = () => navigation.openDrawer();
  return (
    <TouchableOpacity m="0 0 0 20px" onPress={openDrawer}>
      <Icon
        name="menu-outline"
        type="ionicons"
        size={30}
        color={theme.color.secondary}
      />
    </TouchableOpacity>
  );
};

export default MenuIcon;
