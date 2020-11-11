import React from 'react';
import TouchableOpacity from '../Touchable';
import Icon from '../Icon';
import theme from '~/config/theme';

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
      <Icon
        type="ionicons"
        name="add-circle-outline"
        size={30}
        color={theme.color.secondary}
      />
    </TouchableOpacity>
  );
};

export default AddProductIcon;
