import React, {useState} from 'react';
import styled from 'styled-components';
import {Dimensions} from 'react-native';
import FlipCard from 'react-native-flip-card';

import Block from '../Block';
import TouchableOpacity from '../Touchable';
import Text from '../Text';
import Icon from '../Icon';

import theme from '~/config/theme';

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

const Card = ({item}) => {
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => setFavorite(!favorite);

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
          <Image rezideMode="cover" source={{uri: item.img}} />
        </Block>

        {/* Back Side */}

        <Block flex={1} center middle bg="#24364E">
          <Text h3 color={theme.color.secondary} bold>
            {item.id}
          </Text>
        </Block>
      </FlipCard>

      <Block row h="20%">
        <TouchableOpacity flex={1} center middle bg="#1F6274">
          <Icon type="antDesign" name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          flex={1}
          center
          middle
          bg="#133b5c"
          onPress={handleFavorite}>
          <Icon
            type="maturialIcons"
            name={favorite ? 'favorite' : 'favorite-outline'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </Block>
    </Wrapper>
  );
};

export default Card;
