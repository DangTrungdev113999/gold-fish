import React, { useState } from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Block from '../Block';
import TouchableOpacity from '../Touchable';
import Text from '../Text';
import Icon from '../Icon';

import theme from '~/config/theme';
import { shoeType } from '~/@types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//@ts-ignore
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Block)`
  margin: 10px;
  width: ${windowWidth / 2 - 30}px;
  height: ${windowHeight / 5}px;
  border-radius: 5px;
  overflow: hidden;
  elevation: 3;
`;

type CardPropsType = {
  item: shoeType;
};

const Card = ({ item }: CardPropsType) => {
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);
  const [side, setSide] = useState(true);

  const handleFavorite = () => setFavorite(!favorite);

  const onEdit = () => {
    navigation.navigate('action_shoe_screen', {
      type: 'update',
      shoeDetail: item,
    });
  };

  return (
    <Wrapper>
      {side ? (
        <TouchableOpacity flex={1} onPress={() => setSide(false)}>
          <Image
            rezideMode="cover"
            resizeMethod="resize"
            source={{ uri: item.imageUri }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          flex={1}
          center
          middle
          bg="#24364E"
          onPress={() => setSide(true)}>
          <Text h3 color={theme.color.secondary} bold center>
            {item.shoeId}
          </Text>
        </TouchableOpacity>
      )}

      <Block row h="20%">
        <TouchableOpacity
          flex={1}
          center
          middle
          // bg={theme.color.information}
          bg="#1D2636"
          onPress={onEdit}>
          <Icon
            type="antDesign"
            name="edit"
            size={20}
            color={theme.color.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          flex={1}
          center
          middle
          bg="#203047"
          onPress={handleFavorite}>
          <Icon
            type="maturialIcons"
            name={favorite ? 'favorite' : 'favorite-outline'}
            size={20}
            color={theme.color.secondary}
          />
        </TouchableOpacity>
      </Block>
    </Wrapper>
  );
};

export default Card;
