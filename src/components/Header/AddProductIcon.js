import React from 'react';
import Block from '../Block';
import TouchableOpacity from '../Touchable';
import Icon from '../Icon';

const AddProductIcon = () => {
  return (
    <TouchableOpacity m="0 20px 0 0">
      <Icon type="ionicons" name="add-circle-outline" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

export default AddProductIcon;
