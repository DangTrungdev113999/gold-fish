import React from 'react';
import TouchableOpacity from '../Touchable';
import styled from 'styled-components';

//@ts-ignore
const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const FavouriteIcon = ({ navigation, fromScreen }: any) => {
  const goToFavouriteProducts = () => {
    navigation.navigate('favourite_shoes_screen');
    // if (fromScreen === 'shoes') {
    // } else {
    // navigation.navigate('action_slipper_screen', { type: 'add' });
    // }
  };
  return (
    <TouchableOpacity m="0 20px 0 0" onPress={goToFavouriteProducts}>
      <Image source={require('@assets/images/favourite-1.png')} />
    </TouchableOpacity>
  );
};

export default FavouriteIcon;
