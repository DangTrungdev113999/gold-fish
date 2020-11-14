/* eslint-disable no-sparse-arrays */
//@ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Block from '../Block';
import TouchableOpacity from '../Touchable';
import Text from '../Text';
import Icon from '../Icon';

import theme from '~/config/theme';
import { shoeTypes, slipperType } from '~/@types';
import { separatorCode } from '~/utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//@ts-ignore
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Block)`
  margin: 6px;
  width: ${windowWidth / 2 - 20}px;
  height: ${windowHeight / 5}px;
  border-radius: 4px;
  overflow: hidden;
  elevation: 3;
`;

type CardPropsType = {
  item: shoeTypes | slipperType;
};

const Card = ({ item, targetScreen }: CardPropsType) => {
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);
  const [side, setSide] = useState(true);

  const handleFavorite = () => setFavorite(!favorite);

  const onEdit = () => {
    if (targetScreen === 'action_shoe_screen') {
      navigation.navigate('action_shoe_screen', {
        type: 'update',
        shoeDetail: item,
      });
    } else {
      navigation.navigate('action_slipper_screen', {
        type: 'update',
        slipperDetail: item,
      });
    }
  };

  const separatorResult = separatorCode(item?.shoeId || item?.slipperId);

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
          bg={theme.color.blue3}
          onPress={() => setSide(true)}>
          {separatorResult.prefix ? (
            [
              <Text
                h3
                color={theme.color.secondary}
                bold
                center
                letterSpacing={2}>
                {separatorResult.prefix}
              </Text>,
              <Text h3 color={theme.color.secondary} bold center>
                {separatorResult?.numberic}
              </Text>,
              <Text h3 color={theme.color.secondary} bold center>
                {separatorResult?.colorCode || ''}
              </Text>,
              ,
            ]
          ) : (
            <Text h3 color={theme.color.secondary} bold center>
              {item.shoeId}
            </Text>
          )}
        </TouchableOpacity>
      )}

      <Block row h="20%">
        <TouchableOpacity
          flex={1}
          center
          middle
          bg={theme.color.blue1}
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
          bg={theme.color.blue2}
          onPress={handleFavorite}>
          <Icon
            type="materialIcons"
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
