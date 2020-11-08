import React from 'react';
import TouchableOpacity from '../Touchable';
import Icon from '../Icon';
import theme from '~/config/theme';

const AddProductIcon = ({navigation}) => {
  const goToAddShoe = () => {
    navigation.navigate('action_shoe_screen', {type: 'add'});
  };
  return (
    <TouchableOpacity m="0 20px 0 0" onPress={goToAddShoe}>
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
