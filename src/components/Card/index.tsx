import React, { useState } from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { useNavigation } from '@react-navigation/native';

import Block from '../Block';
import TouchableOpacity from '../Touchable';
import Text from '../Text';
import Icon from '../Icon';

import theme from '~/config/theme';
import { shoeType } from '~/@types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Block)`
  elevation: 1;
  box-shadow: 0px 2px 8px ${theme.color.secondary};
  margin: 10px;
`;

type CardPropsType = {
  item: shoeType;
};

const Card = ({ item }: CardPropsType) => {
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => setFavorite(!favorite);

  const onEdit = () => {
    navigation.navigate('action_shoe_screen', {
      type: 'update',
      shoeDetail: item,
    });
  };

  return (
    <Wrapper
      w={`${windowWidth / 2 - 30}px`}
      h={`${windowHeight / 5}px`}
      block
      borderRadius="5px"
      overflow="hidden">
      <FlipCard friction={60} perspective={10000} flipVertical={true}>
        {/* Face Side */}

        <Block>
          <Image rezideMode="cover" source={{ uri: item.imageUri }} />
        </Block>

        {/* Back Side */}

        <Block flex={1} center middle bg="#24364E">
          <Text h3 color={theme.color.secondary} bold>
            {item.shoeId}
          </Text>
        </Block>
      </FlipCard>

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
